'use server';

import prisma from '@/lib/db';
import { signUpSchema, SignUpSchema } from '@/schemas/signUpSchema';
import { hash } from 'bcryptjs';
import z from 'zod';

export async function signUpAction(signUpData: SignUpSchema) {
	const { success, data, error } = signUpSchema.safeParse(signUpData);

	if (!success) {
		return {
			success: false,
			errors: z.flattenError(error),
		};
	}

	const { name, email, password } = data;

	const hashedPassword = await hash(password, 12);

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	return { success: true };
}
