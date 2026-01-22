'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export function SignInWithGoogleButton() {

	return (
		<Button
			type='button'
			onClick={() => signIn('google')}
		>
			Conectar
		</Button>
	);
}
