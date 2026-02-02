'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ResetSchema, resetSchema } from '@/schemas/resetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ForgotEmailStep } from './ForgotEmailStep';
import { ForgotHeader } from './ForgotHeader';
import { ForgotVerifyStep } from './ForgotVerifyStep';

export type Steps = 'email' | 'verify';

export function ForgotPasswordForm() {
	const [step, setStep] = useState<Steps>('email');

	const form = useForm<ResetSchema>({
		defaultValues: {
			emailStep: {
				email: '',
			},
			verifyStep: {
				code: '',
				password: '',
				confirmPassword: '',
			},
		},
		resolver: zodResolver(resetSchema),
	});

	function handleToChangeStep(stepState: Steps) {
		setStep(stepState);
	}

	const headerText = step === 'email'
		? 'Insira seu e-mail abaixo para resetar a senha'
		: 'Insira seu código e a nova senha';

	return (
		<FormProvider {...form}>
			<Card>
				<ForgotHeader message={headerText} />
				<CardContent>
					{step === 'email' && (
						<ForgotEmailStep
							onChangeStep={handleToChangeStep}
						/>
					)}
					{step === 'verify' && (
						<ForgotVerifyStep
							onChangeStep={handleToChangeStep}
						/>
					)}
				</CardContent>
			</Card>

		</FormProvider>
	);
}
