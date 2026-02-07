'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import { unlinkAccount } from '../actions/unlinkAccount';

interface IEmailGoogleButton {
	email: string
}
export function EmailGoogleButton({ email }: IEmailGoogleButton) {

	async function handleUnlinkAccount() {
		const response = await unlinkAccount('google');

		if (response?.error) {
			toast.error(response.error);
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size="sm">
					{email}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="center" className="w-full rounded-md p-0 flex items-center justify-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onClick={handleUnlinkAccount}
				>
					<LogOutIcon size='13' />
					<span className="text-[13px]">
						Desconectar
					</span>
				</Button>
			</PopoverContent>
		</Popover>
	);
}
