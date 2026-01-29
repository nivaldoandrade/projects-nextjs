/* eslint-disable @typescript-eslint/naming-convention */
import { UserRole } from '@/generated/prisma/enums';
import { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {

	interface User {
		role?: UserRole;
	}

	interface Session {
		user: {
			role?: UserRole
		} & DefaultSession['user']
	}

}

declare module 'next-auth/jwt' {
	interface JWT {
		role?: UserRole;
	}
}
