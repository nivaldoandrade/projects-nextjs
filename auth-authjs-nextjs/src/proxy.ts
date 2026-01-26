import { auth } from './lib/auth';

export default auth((request) => {
	const isLogged = !!request.auth;
	const pathname = request.nextUrl.pathname;

	// const hasAuthError = request.nextUrl.searchParams.has('error');
	// if (hasAuthError) {
	// 	return;
	// }

	const publicRoutes = ['/login', '/signup'];

	if (!isLogged && publicRoutes.includes(pathname)) {
		return;
	}

	const isPrivatePage = pathname.startsWith('/dashboard');

	if (isLogged && isPrivatePage) {
		return;
	}

	if (isLogged && !isPrivatePage) {
		const callbackError = request.nextUrl.searchParams.get('error');
		const newUrl = new URL('/dashboard', request.nextUrl);

		if (callbackError) {
			newUrl.pathname = '/dashboard/settings';
			newUrl.searchParams.set('authError', callbackError);
		}

		return Response.redirect(newUrl);
	}

	if (!isLogged && isPrivatePage) {
		const newUrl = new URL('/login', request.nextUrl);
		newUrl.searchParams.set('callbackUrl', pathname);

		return Response.redirect(newUrl);
	}

});

export const config = {
	matcher: [
		'/signup',
		'/login',
		'/dashboard/:path*',
	],
};
