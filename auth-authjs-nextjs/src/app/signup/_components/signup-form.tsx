'use client';

import { signUpAction } from '@/app/signup/signUpAction';
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
import { signUpSchema, SignUpSchema } from '@/schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { FieldPath, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const {
		register,
		getValues,
		handleSubmit: handleSubmitRHF,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignUpSchema>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(signUpSchema),
	});

	const handleSubmit = handleSubmitRHF(async (data) => {
		const { success, type, errors } = await signUpAction(data);

		if (!success) {
			switch (type) {
				case 'GLOBAL_ERRORS':
					toast.error(errors);
					return;

				case 'FIELD_ERRORS':
					Object.entries(errors?.fieldErrors ?? {}).forEach(([field, message]) => {
						setError(field as FieldPath<SignUpSchema>, {
							message: message[0],
						});
					});
					return;
			}
		}
		toast.success('A conta foi criada com sucesso!');
		redirect(`/login?email=${getValues('email')}`);

	});

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Criar uma conta</CardTitle>
				<CardDescription>
					Insira as suas informações abaixo para criar a sua conta
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} noValidate>
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
								<Button
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting && <Loader2Icon className="animate-spin" />}
									{isSubmitting ? 'Criando a conta...' : 'Criar Conta'}
								</Button>
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
