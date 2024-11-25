import { Button } from "@/app/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function HeroSection() {
	return (
		<div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 overflow-hidden">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

			{/* Animated Grid Background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

			<div className="relative z-10">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
					</span>
					Live on Stellar Network
				</div>

				<h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8 bg-clip-text from-primary to-primary/70">
					The Future of
					<span className="block mt-2">Secure Trading</span>
				</h1>

				<p className="text-xl text-muted-foreground max-w-[600px] mb-12">
					Experience trustless trading with built-in Stellar escrow protection.
					Your gateway to secure, decentralized commerce.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button size="lg" className="group">
						<Wallet className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
						Connect Wallet
					</Button>
					<Link
						href="/marketplace
		  "
					>
						<Button variant="outline" size="lg" className="group">
							Explore Marketplace
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>

				{/* Live Stats Ticker */}
				<div className="mt-16 flex gap-8 justify-center items-center text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
						Network Status: Active
					</div>
					<div>24h Volume: $1.2M</div>
					<div>Gas: 0.001 XLM</div>
				</div>
			</div>
		</div>
	);
}
