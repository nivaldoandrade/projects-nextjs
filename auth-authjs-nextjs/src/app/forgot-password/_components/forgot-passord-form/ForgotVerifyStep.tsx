import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/resetSchema';
import { Loader2Icon, RotateCcwIcon } from 'lucide-react';
import { redirect, RedirectType } from 'next/navigation';
import { FieldPath, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Steps } from '.';
import { generateAndSendResetCode } from '../../actions/generateAndSendResetCode';
import { resetPasswordAction } from '../../actions/resetPasswordAction';

interface IForgotVerifyStep {
	onChangeStep: (stepState: Steps) => void;
}

export function ForgotVerifyStep({ onChangeStep }: IForgotVerifyStep) {

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit: handleSubmitRHF,
		setError,
		clearErrors,
		getValues,
	} = useFormContext<ResetSchema>();

	async function handleResendResetCode() {
		const email = getValues('emailStep.email');

		const { success } = await generateAndSendResetCode(email);

		if (!success) {
			toast.error('Não foi possível enviar o código. Tente novamente.');
			return;
		}

		toast.success('Código reenviado com sucesso!');
		clearErrors('verifyStep.code');

	}

	const handleSubmit = handleSubmitRHF(async (data) => {
		await new Promise(resolve => setTimeout(resolve, 2000));
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
				case 'CODE_EXPIRE':
					setError('verifyStep.code',
						{ message: errors, type: 'deps' },
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
							{errors.verifyStep?.code?.type === 'deps' &&
								<Button
									type='button'
									variant="outline"
									size="icon-sm"
									onClick={handleResendResetCode}
								>
									<RotateCcwIcon className='size-4' />
								</Button>
							}
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
			</FieldGroup>
		</form>
	);
}
