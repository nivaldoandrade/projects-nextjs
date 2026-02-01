import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { magicLinkLoginSchema, MagicLinkLoginSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { loginMagiLinkAction } from '../../loginActions';

interface IMagicLinkFormProps {
	onChangeFormType: () => void;
	callbackError: string | undefined;
}

export function MagicLinkForm({ onChangeFormType, callbackError }: IMagicLinkFormProps) {
	const {
		register,
		formState: { errors, isSubmitting },
		reset,
		handleSubmit: handleSubmitRHF,
	} = useForm<MagicLinkLoginSchema>({
		defaultValues: {
			email: '',
		},
		resolver: zodResolver(magicLinkLoginSchema),
	});

	const handleSubmit = handleSubmitRHF(async (data) => {
		await loginMagiLinkAction(data);
		reset();
		toast.success('Enviado! Verifique seu e-mail para fazer login.');
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
							required
							{...register('email')}
						/>
						<FieldError>{errors.email?.message || callbackError}</FieldError>
					</FieldContent>
				</Field>
				<Field>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting &&
							<Loader2Icon className="animate-spin" />
						}
						{isSubmitting ? 'Enviando...' : 'Enviar Magic Link'}
					</Button>
					<Button
						variant='outline'
						type="button"
						onClick={onChangeFormType}
						disabled={isSubmitting}
					>
						Voltar
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
}
