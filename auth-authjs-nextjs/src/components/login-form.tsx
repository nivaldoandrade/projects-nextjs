import { loginGoogleAction } from '@/app/login/loginActions';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LoginSchema } from '@/schemas/loginSchema';
import { useFormContext } from 'react-hook-form';

type LoginFormProps = {
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	callbackError?: string;
}

export function LoginForm({
	onSubmit,
	callbackError,
	className,
	...props
}: React.ComponentProps<'div'> & LoginFormProps) {
	const { register, clearErrors, formState: { errors } } = useFormContext<LoginSchema>();

	function clearRootError() {
		if (errors.root) {
			clearErrors('root');
		}
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
					<form onSubmit={onSubmit} noValidate>
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
								<FieldDescription className="text-center">
									Não tem uma conta?
									<a href="/signup">Criar conta</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
