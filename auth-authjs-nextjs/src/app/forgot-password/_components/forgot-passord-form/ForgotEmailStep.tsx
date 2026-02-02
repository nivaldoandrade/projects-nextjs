import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/resetSchema';
import { Loader2Icon } from 'lucide-react';
import { useTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Steps } from '.';
import { generateAndSendResetCode } from '../../actions/generateAndSendResetCode';

interface IForgotEmailStepProps {
	onChangeStep: (stepState: Steps) => void;
}

export function ForgotEmailStep({ onChangeStep }: IForgotEmailStepProps) {

	const [isLoading, startTransition] = useTransition();

	const {
		register,
		trigger,
		formState: { errors },
		getValues,
	} = useFormContext<ResetSchema>();

	function handleVerifyStep() {
		startTransition(async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));

			const isValid = await trigger('emailStep', {
				shouldFocus: true,
			});

			const email = getValues('emailStep.email');

			if (!isValid) {
				return;
			}

			const { success } = await generateAndSendResetCode(email);

			if (!success) {
				toast.error('Não foi possível enviar o código. Tente novamente.');
				return;
			}

			onChangeStep('verify');
		});
	}

	return (
		<>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<FieldContent>
						<Input
							id="email"
							type="email"
							placeholder="johndoe@mail.com"
							required
							disabled={isLoading}
							{...register('emailStep.email')}
						/>
						<FieldError>{errors.emailStep?.email?.message}</FieldError>
					</FieldContent>
				</Field>
				<Field>
					<Button
						type="button"
						onClick={handleVerifyStep}
						disabled={isLoading}
					>
						{isLoading &&
							<Loader2Icon className="animate-spin" />
						}
						{
							isLoading ? 'Enviando...' : 'Recuperar a senha'
						}
					</Button>
					<Button
						variant='outline'
						type="button"
						disabled={isLoading}
					>
						Voltar
					</Button>
				</Field>
			</FieldGroup>
		</>
	);
}
