'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { clearSerchParamsFromUrl, cn } from '@/lib/utils';
import { useState } from 'react';
import { CredentialsForm } from './CredentialsForm';
import { MagicLinkForm } from './MagicLinkForm';

export type LoginMethod = 'credintials' | 'magic-link';

export type LoginState = {
	method: LoginMethod;
	email?: string;
	callbackError?: string;
	callbackUrl?: string;
}

interface ILoginFormProps extends React.ComponentProps<'div'> {
	initialState: LoginState;
}

export function LoginForm({
	initialState: loginFormObject,
	className,
	...props
}: ILoginFormProps) {
	const [loginState, setLoginState] = useState<LoginState>(loginFormObject);

	function toogleLoginMethod() {
		if (loginState.callbackError) {
			clearSerchParamsFromUrl('error');
		}

		setLoginState(prevState => ({
			method: prevState.method === 'credintials'
				? 'magic-link'
				: 'credintials',
		}));
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Fazer login na sua conta</CardTitle>
					<CardDescription>
						Insira seu e-mail abaixo para fazer login
					</CardDescription>
				</CardHeader>
				<CardContent>
					{loginState.method === 'credintials'
						? (
							<CredentialsForm
								email={loginState.email}
								callbackError={loginState.callbackError}
								callbackUrl={loginState.callbackUrl}
								onChangeFormType={toogleLoginMethod}
							/>
						) : (
							<MagicLinkForm
								callbackError={loginState.callbackError}
								onChangeFormType={toogleLoginMethod}
							/>
						)
					}
				</CardContent>
			</Card>
		</div>
	);
}
