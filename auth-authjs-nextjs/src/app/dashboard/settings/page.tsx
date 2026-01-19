import { auth } from '@/lib/auth';

export default async function settings() {
	const session = await auth();

	return (
		<h1>A página de configuração do usuário: {session?.user?.name}</h1>
	);
}
