'use server';

import prisma from '@/lib/db';
import { signUpSchema, SignUpSchema } from '@/schemas/signUpSchema';
import { hash } from 'bcryptjs';
import z from 'zod';
import { typeToFlattenedError } from 'zod/v3';

type SignUpResult =
	| {
		success: true;
		type?: undefined;
		errors?: undefined;
	}
	| {
		success: false,
		type: 'FIELD_ERRORS'
		errors: typeToFlattenedError<SignUpSchema>
	}
	| {
		success: false,
		type: 'GLOBAL_ERRORS'
		errors: string;
	};

export async function signUpAction(signUpData: SignUpSchema): Promise<SignUpResult> {
	const { success, data, error } = signUpSchema.safeParse(signUpData);

	if (!success) {
		return {
			success: false,
			type: 'FIELD_ERRORS',
			errors: z.flattenError(error),
		};
	}

	const { name, email, password } = data;

	const emailAlreadyInUser = await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});

	if (emailAlreadyInUser) {
		return {
			success: false,
			type: 'GLOBAL_ERRORS',
			errors: 'Já existe uma conta com esse email.',
		};
	}

	const hashedPassword = await hash(password, 12);

	try {
		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
	} catch {
		return {
			success: false,
			type: 'GLOBAL_ERRORS',
			errors: 'Error ao criar a conta. Tente novamente!',
		};

	}

	return { success: true };
}
