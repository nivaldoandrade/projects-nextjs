import { auth } from '@/lib/auth';
import { EmailGoogleButton } from './_components/EmailGoogleButton';
import { SignInWithGoogleButton } from './_components/SignInWithGoogleButton';
import { getGoogleAccountEmail } from './actions/getGoogleAccountEmail';

export default async function settings() {
	const session = await auth();

	if (!session?.user) {
		return null;
	}

	const accountEmailGoogle = await getGoogleAccountEmail(session);

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
									{!accountEmailGoogle
										? 'Vincule a sua conta do Google.'
										: 'Conta do Google vinculada.'
									}
								</small>
							</div>
							{!accountEmailGoogle
								? (
									<SignInWithGoogleButton />
								)
								:
								<EmailGoogleButton email={accountEmailGoogle} />
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
