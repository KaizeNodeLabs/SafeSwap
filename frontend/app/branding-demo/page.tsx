"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { SafeSwapLogo } from "../components/ui/SafeSwapLogo";

export default function Home() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			setDark(JSON.parse(darkMode));
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			document.documentElement.classList.toggle("dark", dark);
			localStorage.setItem("darkMode", JSON.stringify(dark));
		}
	}, [dark]);

	return (
		<main className="flex flex-col h-screen">
			<header className="px-6 py-4 shadow-lg flex justify-between items-center">
				<Image
					src={dark ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
					width={150}
					height={40}
					alt="SafeSwap Logo"
					className="transition-opacity duration-300"
				/>
				<button
					onClick={() => setDark(!dark)}
					className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
					aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
				>
					{dark ? (
						<IoSunny className="w-6 h-6" />
					) : (
						<IoMoon className="w-6 h-6" />
					)}
				</button>
			</header>

			{/* Hero Section */}
			<div className="flex-grow flex items-center justify-center relative overflow-hidden dark:bg-gray-900 dark:text-white">
				{/* Gradient Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background dark:from-primary/5 dark:via-gray-800 dark:to-gray-900" />

				{/* Animated Grid Background */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)]" />

				<div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
					<Image
						src={dark ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
						width={200}
						height={50}
						alt="SafeSwap Logo"
						className="mx-auto mb-8 transition-opacity duration-300"
					/>

					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 dark:bg-primary/20 dark:text-primary/80">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:opacity-50" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-primary/70" />
						</span>
						Live on Stellar Network
					</div>

					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/70">
						The Future of
						<span className="block mt-2">Secure Trading</span>
					</h1>

					<p className="text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto mb-8 dark:text-gray-400">
						Experience trustless trading with built-in Stellar escrow
						protection. Your gateway to secure, decentralized commerce.
					</p>

					{/* Live Stats Ticker */}
					<div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-sm text-muted-foreground dark:text-gray-400">
						<div className="flex items-center gap-2">
							<span className="inline-block w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></span>
							Network Status: Active
						</div>
						<div>24h Volume: $1.2M</div>
						<div>Gas: 0.001 XLM</div>
					</div>
				</div>
			</div>

			<footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
				<div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
					<div className="flex items-center gap-2">
						<Image
							src={dark ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
							width={100}
							height={25}
							alt="SafeSwap Logo"
							className="transition-opacity duration-300"
						/>
						<SafeSwapLogo />
						<p className="text-sm text-muted-foreground">Built on Stellar</p>
					</div>
					<div className="flex gap-4">
						<Link
							href="/terms"
							className="text-sm text-muted-foreground hover:underline underline-offset-4"
						>
							Terms
						</Link>
						<Link
							href="/privacy"
							className="text-sm text-muted-foreground hover:underline underline-offset-4"
						>
							Privacy
						</Link>
					</div>
				</div>
			</footer>
		</main>
	);
}
