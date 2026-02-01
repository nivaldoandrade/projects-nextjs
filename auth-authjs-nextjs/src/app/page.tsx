import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {

	return (
		<div className="min-h-svh flex gap-4 flex-col items-center justify-center">
			<h1>Homepage</h1>
			<div className="space-x-4">
				<Button variant="outline" asChild >
					<Link href="/login">Entrar</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/signup">Criar conta</Link>
				</Button>
			</div>
		</div>
	);
}
