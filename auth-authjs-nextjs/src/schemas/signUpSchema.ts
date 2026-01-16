import z from 'zod';

export const signUpSchema = z.object({
	name: z.string().trim().min(1, 'Informe o seu nome'),
	email: z.email('Informe um email valido'),
	password: z.string().trim().min(8, 'Pelo menos 8 caracteres'),
	confirmPassword: z.string().trim().min(8, 'Confirme sua senha'),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: 'As senhas informadas são diferentes',
	path: ['confirmPassword'],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
