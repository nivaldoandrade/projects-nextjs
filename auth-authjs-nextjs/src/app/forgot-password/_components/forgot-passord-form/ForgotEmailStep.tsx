import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/resetSchema';
import { Loader2Icon } from 'lucide-react';
import { useTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { Steps } from '.';

interface IForgotEmailStepProps {
	onChangeStep: (stepState: Steps) => void;
}

export function ForgotEmailStep({ onChangeStep }: IForgotEmailStepProps) {

	const [isLoading, startTransition] = useTransition();

	const {
		register,
		trigger,
		formState: { errors },
	} = useFormContext<ResetSchema>();

	function handleVerifyStep() {
		startTransition(async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));

			const isValid = await trigger('emailStep', {
				shouldFocus: true,
			});

			if (isValid) {
				onChangeStep('verify');
			}
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
