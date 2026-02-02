import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/resetSchema';
import { Loader2Icon } from 'lucide-react';
import { redirect, RedirectType } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Steps } from '.';

interface IForgotVerifyStep {
	onChangeStep: (stepState: Steps) => void;
}

export function ForgotVerifyStep({ onChangeStep }: IForgotVerifyStep) {

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit: handleSubmitRHF,
	} = useFormContext<ResetSchema>();

	const handleSubmit = handleSubmitRHF(async (data) => {
		await new Promise(resolve => setTimeout(resolve, 2000));
		console.log(data);

		toast.success('Senha redefinida com sucesso!');
		redirect('/login', RedirectType.replace);
	});

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
							disabled
							required
							{...register('emailStep.email')}
						/>
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel htmlFor="code">Código</FieldLabel>
					<FieldContent>
						<Input
							id="code"
							type="text"
							placeholder="12345678"
							required
							{...register('verifyStep.code')}
						/>
						<FieldError>{errors.verifyStep?.code?.message}</FieldError>
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
							{...register('verifyStep.password')}
						/>
						<FieldError>{errors.verifyStep?.password?.message}</FieldError>
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
						{...register('verifyStep.confirmPassword')}
					/>

					<FieldError>{errors.verifyStep?.confirmPassword?.message}</FieldError>
				</Field>
				<Field>
					<Button
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting &&
							<Loader2Icon className="animate-spin" />
						}
						{
							isSubmitting ? 'Enviando...' : 'Recuperar a senha'
						}
					</Button>
					<Button
						variant='outline'
						type="button"
						onClick={() => onChangeStep('email')}
						disabled={isSubmitting}
					>
						Voltar
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
}
