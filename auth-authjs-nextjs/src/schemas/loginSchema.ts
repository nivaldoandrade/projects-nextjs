import * as z from 'zod';

export const loginSchema = z.object({
	email: z.email('Informe um email válido'),
	password: z.string().trim().min(8, 'Pelo menos 8 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
