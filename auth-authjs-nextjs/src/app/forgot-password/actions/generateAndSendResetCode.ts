'use server';

import prisma from '@/lib/db';
import { resend } from '@/lib/resend';
import { hashCode } from '@/lib/utils';
import { enforceRateLimit } from './utils/enforceRateLimit';

export async function generateAndSendResetCode(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			forgotPasswordCodes: {
				select: {
					attempts: true,
					lastSentAt: true,
				},
			},
		},
	});

	if (!user) {
		return { success: true };
	}

	const rateLimit = await enforceRateLimit(user.forgotPasswordCodes);

	if (!rateLimit.success) {
		return {
			success: rateLimit.success,
			type: rateLimit.type,
		};
	}

	const code = generateCode();
	const codeHash = hashCode(code);

	const expires = new Date(Date.now() + 5 * 60 * 1000); //5min

	await prisma.forgotPasswordCode.upsert({
		where: { userId: user.id },
		update: {
			code: codeHash,
			expires,
			attempts: rateLimit.attempts + 1,
			lastSentAt: new Date(),
		},
		create: {
			userId: user.id,
			code: codeHash,
			expires,
			attempts: rateLimit.attempts + 1,
		},
	});

	const { error } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Chegou o seu código para redefinir a senha',
		html: `Seu código é ${code}`,
	});

	if (error) {
		return {
			success: false,
		};
	}

	return {
		success: true,
	};
}

function generateCode(length = 8) {
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;

	const code = Math.floor(Math.random() * (max - min + 1)) + min;
	return code.toString();
}

