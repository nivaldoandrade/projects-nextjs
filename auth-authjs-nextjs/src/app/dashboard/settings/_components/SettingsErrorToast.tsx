'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SettingsErrorToast() {
	const searchParams = useSearchParams();

	const authError = searchParams.get('authError');

	useEffect(() => {
		if (authError) {
			toast.error(
				'Essa conta já está vinculada a outro usuário.',
			);

			const url = new URL(window.location.href);
			url.searchParams.delete('authError');
			window.history.replaceState({}, '', url.toString());
		}
	}, [authError]);

	return null;
}
