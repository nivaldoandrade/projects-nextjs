import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { credentialsLoginSchema, CredentialsLoginSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginCredentialsAction, loginGoogleAction } from '../../loginActions';

interface ICredentailsFormProps {
	email?: string;
	callbackError?: string;
	callbackUrl?: string;
	onChangeFormType: () => void;
}

export function CredentialsForm({
	email,
	callbackError,
	callbackUrl,
	onChangeFormType,
}: ICredentailsFormProps) {

	const {
		register,
		clearErrors,
		formState: { errors },
		handleSubmit: handleSubmitRHF,
		setError,
	} = useForm<CredentialsLoginSchema>({
		defaultValues: {
			email,
			password: '',
		},
		resolver: zodResolver(credentialsLoginSchema),
	});

	const handleSubmit = handleSubmitRHF(async (data) => {
		const callback = callbackError ? '/dashboard/settings' : callbackUrl;
		const { success, error } = await loginCredentialsAction(data, callback);

		if (!success) {
			setError('root', {
				message: error,
			});
		}
	});

	function clearRootError() {
		if (errors.root) {
			clearErrors('root');
		}
	}

	return (
		<form onSubmit={handleSubmit} noValidate>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<FieldContent>
						<Input
							id="email"
							type="email"
							placeholder="johndoe@mail.com"
							required
							{...register('email', {
								onChange: clearRootError,
							})}
						/>
						<FieldError>{errors.email?.message}</FieldError>
					</FieldContent>
				</Field>
				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="password">Senha</FieldLabel>
						<a
							href="#"
							className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
						>
							Esqueceu sua senha?
						</a>
					</div>
					<FieldContent>
						<Input
							id="password"
							type="password"
							placeholder="*********"
							required
							{...register('password', {
								onChange: clearRootError,
							})}
						/>
						<FieldError>{errors.password?.message || errors.root?.message || callbackError}</FieldError>
					</FieldContent>
				</Field>
				<Field>
					<Button type="submit">Login</Button>
					<Button
						variant="outline"
						type="button"
						onClick={loginGoogleAction}
					>
						Login com Google
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={onChangeFormType}
					>
						Login com Magic Link
					</Button>
					<FieldDescription className="text-center">
						Não tem uma conta?
						<a href="/signup">Criar conta</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
