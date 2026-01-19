import { redirect, RedirectType } from 'next/navigation';

export default function DashboardCatchAll() {
	redirect('/dashboard', RedirectType.replace);
}
