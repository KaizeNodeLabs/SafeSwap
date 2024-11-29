import Link from "next/link";
import * as React from "react";
import { SafeSwapLogo } from "./SafeSwapLogo";

export function Footer() {
	return (
		<footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
			<div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
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
			</div>
		</footer>
	);
}
