import { SessionProvider } from 'next-auth/react';
import { AppBar } from './_components/app-bar';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<div>
				<AppBar />
				<main className="px-4">{children}</main>
			</div>
		</SessionProvider>
	);
}
