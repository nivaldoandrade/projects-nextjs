'use server';

import prisma from '@/lib/db';
import { hashCode } from '@/lib/utils';
import { ResetSchema, resetSchema } from '@/schemas/resetSchema';
import { hash } from 'bcryptjs';
import { $ZodIssue } from 'zod/v4/core';

type resetPasswordActionResult =
	| {
		success: true;
		type?: undefined;
		errors?: undefined;
	}
	| {
		success: false;
		type: 'FIELD_ERRORS';
		errors: $ZodIssue[]
	}
	| {
		success: false;
		type: 'CODE_INVALID';
		errors: string;
	};

export async function resetPasswordAction(resetData: ResetSchema): Promise<resetPasswordActionResult> {
	const { success, data, error } = resetSchema.safeParse(resetData);

	if (!success) {

		return {
			success: false,
			type: 'FIELD_ERRORS',
			errors: error.issues,
		};
	}

	const { emailStep, verifyStep } = data;
	const email = emailStep.email;
	const { code, password } = verifyStep;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			forgotPasswordCodes: {
				select: {
					code: true,
					expires: true,
				},
			},
		},
	});

	if (!user) {
		return { success: true };
	}

	const resetCode = user.forgotPasswordCodes;

	if (!resetCode) {
		return {
			success: false,
			type: 'CODE_INVALID',
			errors: 'Código inválido',
		};
	}

	const { code: storedCode, expires } = resetCode;

	const codeHash = hashCode(code);

	if (codeHash !== storedCode) {
		return {
			success: false,
			type: 'CODE_INVALID',
			errors: 'O código está incorreto ou inválido',
		};
	}

	const now = new Date();

	if (expires <= now) {
		return {
			success: false,
			type: 'CODE_INVALID',
			errors: 'O código está incorreto ou inválido',
		};
	}

	const hashedPassword = await hash(password, 12);

	await prisma.$transaction([
		prisma.user.update({
			where: { id: user.id },
			data: {
				password: hashedPassword,
			},
		}),
		prisma.forgotPasswordCode.delete({
			where: { userId: user.id },
		}),
	]);

	return { success: true };
}
