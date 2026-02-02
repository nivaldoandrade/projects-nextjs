import { clsx, type ClassValue } from 'clsx';
import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function clearSerchParamsFromUrl(searchParams: string) {
	const url = new URL(window.location.href);
	url.searchParams.delete(searchParams);
	window.history.replaceState({}, '', url.toString());
}

export function hashCode(code: string) {
	return crypto.createHash('sha256').update(code).digest('hex');
}
