'use server';

import { signIn } from '@/lib/auth';
import { LoginSchema } from '@/schemas/loginSchema';
import { SignInError } from '@auth/core/errors';

export async function loginCredentialsAction(data: LoginSchema, callbackUrl: string | null) {

	const redirectTo = (callbackUrl && callbackUrl.startsWith('/'))
		? callbackUrl
		: '/dashboard';

	const { email, password } = data;
	try {
		await signIn(
			'credentials',
			{
				email,
				password,
				redirectTo,
			},
		);

		return { success: true };
	} catch (error) {
		if (error instanceof SignInError) {
			switch (error.type) {
				case ('CredentialsSignin'):
					return { success: false, error: 'Credencias inválidas' };
				default:
					return { success: false, error: 'Algo deu erro. Tente novamente' };
			}
		}

		throw error;
	}

}

export async function loginGoogleAction() {
	return await signIn('google');
}
