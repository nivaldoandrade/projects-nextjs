import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ResetSchema } from '@/schemas/resetSchema';
import { Loader2Icon } from 'lucide-react';
import { redirect, RedirectType } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Steps } from '.';
import { generateAndSendResetCode } from '../../actions/generateAndSendResetCode';
import { resetPasswordAction } from '../../actions/resetPasswordAction';

interface IForgotVerifyStep {
	onChangeStep: (stepState: Steps) => void;
}

export function ForgotVerifyStep({ onChangeStep }: IForgotVerifyStep) {
	const [retryCooldown, setRetryCooldown] = useState(60);

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit: handleSubmitRHF,
		setError,
		getValues,
	} = useFormContext<ResetSchema>();

	useEffect(() => {
		if (retryCooldown <= 0) {
			return;
		}

		const timer = setTimeout(() => {
			setRetryCooldown(prevState => prevState - 1);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [retryCooldown]);

	async function handleResendVerificationCode() {
		if (isRetryCooldown) {
			return;
		}

		const email = getValues('emailStep.email');

		if (!email) {
			return;
		}

		const { success } = await generateAndSendResetCode(email);

		if (!success) {
			toast.error('Não foi possível enviar o código. Tente novamente.');
			return;
		}

		toast.success('Código reenviado com sucesso!');
		setRetryCooldown(60);
	}

	const handleSubmit = handleSubmitRHF(async (data) => {
		const { success, errors, type } = await resetPasswordAction(data);

		if (!success) {
			switch (type) {
				case 'CODE_INVALID':
					setError('verifyStep.code',
						{ message: errors },
						{ shouldFocus: true },
					);
					toast.error(errors);
					return;
				case 'FIELD_ERRORS':
					Object.entries(errors?.fieldErrors ?? {}).forEach(([field, message]) => {
						setError(field as FieldPath<ResetSchema>, {
							message: message[0],
						});
					});
					return;
			}
		}

		toast.success('Senha redefinida com sucesso!');
		redirect('/login', RedirectType.replace);
	});
	;

	const isRetryCooldown = retryCooldown > 0;

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
						<FieldError className="flex items-center gap-2">
							{errors.verifyStep?.code?.message}
						</FieldError>
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
				<Field>
					<Button
						type="button"
						variant="link"
						disabled={isRetryCooldown || isSubmitting}
						onClick={handleResendVerificationCode}
						className={cn(
							'text-center text-sm text-muted-foreground',
							isRetryCooldown, 'text-inherit',
						)}
					>
						{isRetryCooldown
							? `Reenviar o código em ${retryCooldown}`
							: 'Reenviar o código'
						}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
}
