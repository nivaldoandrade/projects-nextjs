import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Criar uma conta</CardTitle>
				<CardDescription>
					Insira as suas informações abaixo para criar a sua conta
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Nome</FieldLabel>
							<Input id="name" type="text" placeholder="John Doe" required />
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								type="email"
								placeholder="johndoe@mail.com"
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Senha</FieldLabel>
							<div>
								<Input id="password" type="password" required />
								<FieldDescription>
									Deve ter pelo menos 8 caracteres.
								</FieldDescription>
							</div>
						</Field>
						<Field>
							<FieldLabel htmlFor="confirm-password">
								Confirme a senha
							</FieldLabel>
							<div>
								<Input id="confirm-password" type="password" required />
								<FieldDescription>
									Por favor, confirme sua senha.
								</FieldDescription>
							</div>
						</Field>
						<FieldGroup>
							<Field>
								<Button type="submit">Criar Conta</Button>
								<FieldDescription className="px-6 text-center">
									Já tem uma conta? <a href="/login">Entrar</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
