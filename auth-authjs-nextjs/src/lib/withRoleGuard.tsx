import { UserRole } from '@/generated/prisma/enums';
import { redirect } from 'next/navigation';
import { JSX } from 'react/jsx-runtime';
import { auth } from './auth';

export function withRoleGuard<T>(
	Component: React.ComponentType<T>,
	requiredRole: UserRole,
) {

	const ComponentWithRoleGuard = async (
		props: JSX.IntrinsicAttributes & T,
	) => {
		const session = await auth();

		if (session?.user.role !== requiredRole) {
			redirect('/dashboard');
		}

		return <Component {...props} />;
	};

	return ComponentWithRoleGuard;
}
