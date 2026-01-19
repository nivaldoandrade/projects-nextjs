import { auth } from '@/lib/auth';

export default async function dashboard() {

	const session = await auth();

	return (
		<>
			<h1>Dashboard</h1>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</>
	);
}
