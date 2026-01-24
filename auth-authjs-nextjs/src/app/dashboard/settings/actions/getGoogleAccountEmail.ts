'use server';

import db from '@/lib/db';
import { Session } from 'next-auth';

export async function getGoogleAccountEmail(session: Session | null) {
	if (!session?.user?.id) {
		return null;
	}

	const account = await db.account.findFirst({
		where: {
			provider: 'google',
			userId: session.user.id,
		},
		select: {
			providerEmail: true,
		},
	});

	return account?.providerEmail ?? null;
}
