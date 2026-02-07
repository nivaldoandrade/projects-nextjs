
import { credentialsLoginSchema } from '@/schemas/loginSchema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { $ZodError } from 'zod/v4/core';
import prisma from './db';

const getNameFromEmail = (email?: string | null) => {
	if (!email) {
		return null;
	}

	const [localPart] = email.split('@');
	return localPart?.trim() ? localPart.trim() : null;
};

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
			id: 'magic-link',
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

			if (!token.name) {
				session.user.name = getNameFromEmail(token.email);
			}

			return session;
		},
	},
	events: {
		signIn: async ({ user, account, isNewUser }) => {
			if (account?.provider === 'magic-link') {
				const shouldUpdateName = isNewUser || !user?.name;

				if (!shouldUpdateName) {
					return;
				}

				const derivedName = getNameFromEmail(user.email);

				if (!derivedName) {
					return;
				}

				await prisma.user.update({
					where: { id: user.id },
					data: { name: derivedName },
				});
			}
		},
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
