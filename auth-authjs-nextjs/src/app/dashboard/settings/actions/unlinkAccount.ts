'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

type AuthProvider = 'google'

export async function unlinkAccount(provider: AuthProvider) {
	const session = await auth();

	if (!session?.user?.id) {
		return { success: false, error: 'Usuário não autenticado' };
	}

	const userId = session.user.id;

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			password: true,
			accounts: {
				select: {
					provider: true,
				},
			},
		},
	});

	const hasPassword = !!user?.password;
	const totalAccounts = user?.accounts.length ?? 0;
	const isLastAuthMethod = !hasPassword && totalAccounts === 1;

	if (isLastAuthMethod) {
		return {
			success: false,
			error: 'Você precisa definir uma senha antes de desvincular sua única conta google',
		};
	}

	await prisma.account.deleteMany({
		where: {
			provider: provider,
			userId: session.user.id,
		},
	});

	revalidatePath('/dashboard/settings');
	return { success: true };
}
