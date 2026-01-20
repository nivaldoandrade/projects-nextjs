import { Skeleton } from '@/components/ui/skeleton';

export function DashboardAppBarSkeleton() {
	return (
		<nav className="h-18 bg-background border-b mb-4">
			<div className="h-full grid grid-cols-3 items-center px-4">

				<div>
					<Skeleton className="size-10 rounded-full" />
				</div>

				<div className="flex justify-center items-center gap-2">
					<Skeleton className="w-20 h-9" />
					<Skeleton className="w-20 h-9" />
					<Skeleton className="w-20 h-9" />
				</div>

				<div className="flex items-center justify-end gap-1">
					<Skeleton className="size-9 rounded-full" />
					<Skeleton className="w-25 h-5" />
				</div>
			</div>
		</nav>
	);
}
