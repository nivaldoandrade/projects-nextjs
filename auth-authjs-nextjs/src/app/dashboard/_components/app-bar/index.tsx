'use client';

import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { DashboardAppBarSkeleton } from './DashboardAppBarSkeleton';
import { NavMenu } from './NavMenu';
import { UserAvatar } from './UserAvatar';

export function AppBar() {
	const [isLoading, startTransition] = useTransition();
	const session = useSession();

	const handleSignOut = () => {
		startTransition(async () =>
			signOut({ redirectTo: '/login' }),
		);
	};

	if (session.status === 'loading') {
		return <DashboardAppBarSkeleton />;
	}

	return (
		<nav className="h-18 bg-background border-b mb-4">
			<div className="h-full grid grid-cols-3 items-center px-4">

				<div>
					<Button
						aria-label="Sair"
						title="Sair"
						variant="outline"
						size="icon-lg"
						className="rounded-full"
						onClick={handleSignOut}
						disabled={isLoading}
					>
						<LogOutIcon />
					</Button>
				</div>

				<div className="flex justify-center">
					<NavMenu />
				</div>

				<div className="flex justify-end">
					{session.data?.user?.name && (
						<UserAvatar username={session.data.user.name} />
					)}
				</div>
			</div>
		</nav>
	);
}
