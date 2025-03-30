import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareMore, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductCardSkeleton() {
	return (
		<Card className="hover:shadow-lg flex flex-col h-full">
			<CardHeader className="flex-grow-0">
				<div className="w-full relative">
					<div className="w-full h-64 relative">
						<Skeleton className="bg-muted-foreground/10 h-64 w-full rounded-t-lg" />
					</div>
				</div>
				<div className="px-4 pt-4">
					<Skeleton className="bg-muted-foreground/10 h-4 w-24" />
				</div>
				<div className="pt-3 px-4">
					<Skeleton className="bg-muted-foreground/10 h-6 w-full max-w-[250px]" />
				</div>
			</CardHeader>
			<CardContent className="pt-4 flex-grow">
				<Skeleton className="bg-muted-foreground/10 h-9 w-24" />
			</CardContent>
			<CardFooter className="flex flex-col gap-3 mt-auto">
				<Skeleton className="flex w-full h-10 items-center gap-5 text-muted animate-pulse rounded-md bg-muted-foreground/10 " />
				<Skeleton className="flex w-full h-10 items-center gap-5 text-muted animate-pulse rounded-md bg-muted-foreground/10" />
			</CardFooter>
		</Card>
	);
}
