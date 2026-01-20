'use server';

import { signOut } from '@/lib/auth';

export async function singOutAction() {
	await signOut({ redirectTo: '/login' });
}
