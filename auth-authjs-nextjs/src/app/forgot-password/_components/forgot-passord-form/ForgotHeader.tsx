import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IForgotHeader {
	message: string;
}
export function ForgotHeader({ message }: IForgotHeader) {

	return (
		<CardHeader>
			<CardTitle>Esqueci a senha</CardTitle>
			<CardDescription>{message}</CardDescription>
		</CardHeader>
	);
}
