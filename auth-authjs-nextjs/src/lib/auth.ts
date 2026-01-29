
import { credentialsLoginSchema } from '@/schemas/loginSchema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { $ZodError } from 'zod/v4/core';
import prisma from './db';

export const { signIn, auth, signOut, handlers } = NextAuth({
	pages: {
		signIn: '/login',
		error: '/login',
		verifyRequest: '/login',
	},
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		Resend({
			from: 'onboarding@resend.dev',
		}),
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				try {
					const { email, password } = credentialsLoginSchema.parse(credentials);

					user = await prisma.user.findUnique({
						where: { email },
					});

					if (!user || !user.password) {
						return null;
					}

					const isPasswordValid = await compare(password, user.password);

					if (!isPasswordValid) {
						return null;
					}

					return user;
				} catch (error) {
					if (error instanceof $ZodError) {
						return null;
					}

					throw error;
				}
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.role = user.role;
			}

			return token;
		},
		session: async ({ session, token }) => {
			if (token.sub) {
				session.user.id = token.sub;
			}

			if (token.role) {
				session.user.role = token.role;
			}

			return session;
		},
	},
	events: {
		linkAccount: async ({ account, profile }) => {
			if (account?.provider === 'google' && profile?.email) {
				await prisma.account.update({
					where: {
						provider_providerAccountId: {
							provider: 'google',
							providerAccountId: account.providerAccountId,
						},
					},
					data: {
						providerEmail: profile.email,
					},
				});
			}
		},
	},
});
