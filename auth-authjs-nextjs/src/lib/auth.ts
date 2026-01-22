
import { loginSchema } from '@/schemas/loginSchema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { $ZodError } from 'zod/v4/core';
import prisma from './db';

export const { signIn, auth, signOut, handlers } = NextAuth({
	pages: {
		signIn: '/login',
	},
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				try {
					const { email, password } = loginSchema.parse(credentials);

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
	},
});
