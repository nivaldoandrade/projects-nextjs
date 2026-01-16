
import { loginSchema } from '@/schemas/loginSchema';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { $ZodError } from 'zod/v4/core';
import prisma from './db';

export const { signIn } = NextAuth({
	providers: [
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

					if (!user) {
						return null;
					}

					const isPasswordValid = compare(password, user.password);

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
});
