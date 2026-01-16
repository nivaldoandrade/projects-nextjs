'use client';

import { LoginForm } from '@/components/login-form';
import { loginSchema, LoginSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { loginAction } from './loginActions';

export default function Page() {

	const form = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		const { success, error } = await loginAction(data);

		if (!success) {
			form.setError('root', {
				message: error,
			});
		}
	});

	return (
		<FormProvider {...form}>
			<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-sm">
					<LoginForm onSubmit={handleSubmit} />
				</div>
			</div>
		</FormProvider>
	);
}
