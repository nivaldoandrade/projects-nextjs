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
import { SignUpSchema } from '@/schemas/signUpSchema';
import { useFormContext } from 'react-hook-form';

type SignupFormProps = {
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function SignupForm({ onSubmit, ...props }: SignupFormProps & React.ComponentProps<typeof Card>) {

	const { register, formState: { errors } } = useFormContext<SignUpSchema>();

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Criar uma conta</CardTitle>
				<CardDescription>
					Insira as suas informações abaixo para criar a sua conta
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} noValidate>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Nome</FieldLabel>
							<FieldContent>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									required
									{...register('name')}
								/>
								<FieldError>{errors.name?.message}</FieldError>
							</FieldContent>
						</Field>
						<Field>
							<FieldContent>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="johndoe@mail.com"
									required
									{...register('email')}
								/>
								<FieldError>{errors.email?.message}</FieldError>
							</FieldContent>
						</Field>
						<Field>
							<FieldContent>
								<FieldLabel htmlFor="password">Senha</FieldLabel>
								<FieldDescription>
									Deve ter pelo menos 8 caracteres.
								</FieldDescription>
							</FieldContent>
							<FieldContent>
								<Input
									id="password"
									type="password"
									required
									{...register('password')}
								/>
								<FieldError>{errors.password?.message}</FieldError>
							</FieldContent>

						</Field>
						<Field orientation="responsive">
							<FieldContent>
								<FieldLabel htmlFor="confirm-password">
									Confirme a senha
								</FieldLabel>
								<FieldDescription>
									Por favor, confirme sua senha.
								</FieldDescription>
							</FieldContent>

							<Input
								id="confirm-password"
								type="password"
								required
								{...register('confirmPassword')}
							/>

							<FieldError>{errors.confirmPassword?.message}</FieldError>

						</Field>
						<FieldGroup>
							<Field>
								<Button type="submit">Criar Conta</Button>
								<FieldDescription className="px-6 text-center">
									Já tem uma conta? <a href="/login">Entrar</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card >
	);
}
