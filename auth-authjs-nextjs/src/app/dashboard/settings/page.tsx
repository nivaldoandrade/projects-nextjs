import { auth } from '@/lib/auth';
import { SignInWithGoogleButton } from './_components/SignInWithGoogleButton';

export default async function settings() {
	const session = await auth();

	return (
		<div>
			<h1>A página de configuração do usuário: {session?.user?.name}</h1>
			<div className="w-full flex items-center justify-center mt-4">
				<div className="bg-secondary w-full max-w-125 rounded-xl p-4">
					<h2 className="text-xl font-semibold tracking-tighter">
						Conecte sua conta
					</h2>
					<div>
						<div className="flex justify-between items-center mt-4">
							<div className="flex flex-col">
								<span className="text-md font-medium">
									Google
								</span>
								<small className="text-[13px] leading-4 text-muted-foreground">
									Vinculei a sua conta do Google.
								</small>
							</div>
							<SignInWithGoogleButton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
