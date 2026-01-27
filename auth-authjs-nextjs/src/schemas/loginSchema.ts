import * as z from 'zod';

export const credentialsLoginSchema = z.object({
	email: z.email('Informe um email válido'),
	password: z.string().trim().min(8, 'Pelo menos 8 caracteres'),
});

export type CredentialsLoginSchema = z.infer<typeof credentialsLoginSchema>;

export const magicLinkLoginSchema = z.object({
	email: z.email('Informe um email válido'),
});

export type MagicLinkLoginSchema = z.infer<typeof magicLinkLoginSchema>;

