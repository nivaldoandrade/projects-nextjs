import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function clearSerchParamsFromUrl(searchParams: string) {
	const url = new URL(window.location.href);
	url.searchParams.delete(searchParams);
	window.history.replaceState({}, '', url.toString());
}
