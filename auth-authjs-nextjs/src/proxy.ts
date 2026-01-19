import { auth } from './lib/auth';

export default auth((request) => {
	const isLogged = !!request.auth;
	const pathname = request.nextUrl.pathname;

	const publicRoutes = ['/login', '/signup'];

	if (!isLogged && publicRoutes.includes(pathname)) {
		return;
	}

	const isPrivatePage = pathname.startsWith('/dashboard');

	if (isLogged && isPrivatePage) {
		return;
	}

	if (isLogged && !isPrivatePage) {
		return Response.redirect(
			new URL('/dashboard', request.nextUrl.origin),
		);
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
