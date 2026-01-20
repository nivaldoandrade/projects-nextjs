import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface IAvatarProps {
	username: string;
}

export function UserAvatar({ username }: IAvatarProps) {

	const avatarFallback = username
		.trim()
		.split(' ')
		.map(u => u[0])
		.join('')
		.toUpperCase();

	return (
		<div className="flex items-center gap-3">
			<Avatar className="size-12">
				<AvatarFallback>{avatarFallback}</AvatarFallback>
			</Avatar>
			<span className="font-semibold tracking-tight leading-none flex items-center gap-1">
				{username}
			</span>
		</div>
	);
}
