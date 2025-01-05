import Link from "next/link";

import { SafeSwapLogo } from "@/app/components/shared/safe-swap-logo";

export default function Footer() {
	return (
		<footer className="flex items-center justify-between px-6 py-4 border-t">
			<div className="flex items-center gap-2">
				<SafeSwapLogo width={150} height={40} />
				<p className="text-sm text-muted-foreground">Built on Stellar</p>
			</div>
			<div className="flex gap-4">
				<Link
					href="/marketplace"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
				>
					Marketplace
				</Link>
			</div>
		</footer>
	);
}
