import * as z from 'zod';

export const stepEmailSchema = z.object({
	email: z.email('Informe um email valido'),
});

export const stepVerifySchema = z.object({
	code: z.string().trim().min(8, 'Pelo menos 8 caracteres'),
	password: z.string().trim().min(8, 'Pelo menos 8 caracteres'),
	confirmPassword: z.string().trim().min(8, 'Confirme sua senha'),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: 'As senhas informadas são diferentes',
	path: ['confirmPassword'],
});

export const resetSchema = z.object({
	emailStep: stepEmailSchema,
	verifyStep: stepVerifySchema,
});

export type ResetSchema = z.infer<typeof resetSchema>;

