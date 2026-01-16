'use client';

import { SignupForm } from '@/components/signup-form';
import { signUpSchema, SignUpSchema } from '@/schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, FormProvider, useForm } from 'react-hook-form';
import { signUpAction } from './signUpAction';

export default function Page() {

	const form = useForm<SignUpSchema>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(signUpSchema),
	});

	const handleSubmit = form.handleSubmit(async (data) => {

		const { success, errors } = await signUpAction(data);

		if (!success) {
			Object.entries(errors?.fieldErrors ?? {}).forEach(([field, message]) => {
				form.setError(field as FieldPath<SignUpSchema>, {
					message: message[0],
				});
			});

			return;
		}

		console.log('Conta criada com sucesso');
	});

	return (
		<FormProvider {...form}>
			<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-sm">
					<SignupForm onSubmit={handleSubmit} />
				</div>
			</div>
		</FormProvider>
	);
}
