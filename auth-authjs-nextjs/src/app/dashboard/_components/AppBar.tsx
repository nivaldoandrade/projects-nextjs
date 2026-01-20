'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { singOutAction } from '../signOutAction';

export function AppBar() {
	const [isLoading, startTransition] = useTransition();

	return (
		<header className="h-20 flex items-center justify-center">
			<Button
				type="button"
				onClick={() => startTransition(singOutAction)}
				disabled={isLoading}
			>
				Sair
			</Button>
		</header>
	);
}
