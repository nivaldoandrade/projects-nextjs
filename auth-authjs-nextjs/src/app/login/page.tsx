import { LoginForm, LoginState } from './_components/login-form';

type LoginPageParams = {
	searchParams: Promise<{
		error?: string
		callbackUrl?: string
	}>
}

export default async function Page({ searchParams }: LoginPageParams) {
	const { callbackUrl, error } = await searchParams;

	let initialLoginState: LoginState = {
		method: 'credintials',
		callbackUrl: callbackUrl,
	};

	if (error) {
		switch (error) {
			case 'Verification':
				initialLoginState = {
					method: 'magic-link',
					callbackError: 'O link de verificação é inválido ou expirou. Por favor, tente fazer login novamente.',
				};
				break;
			case 'OAuthAccountNotLinked':
				initialLoginState = {
					method: 'credintials',
					callbackError: 'Faça login com e-mail e senha para depois vincular sua conta do Google.',
				};
				break;
			default:
				break;
		}
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm initialState={initialLoginState} />
			</div>
		</div>
	);
}
