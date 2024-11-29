"use client";

import { FeatureSection } from "@/app/components/ui/feature-section";
import { HeroSection } from "@/app/components/ui/hero-section";
import { StatsSection } from "@/app/components/ui/stats-section";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { SafeSwapLogo } from "./components/ui/SafeSwapLogo";

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
		<main className="flex min-h-screen flex-col">
			<header className="px-6 py-4 shadow-lg flex justify-between items-center">
				<SafeSwapLogo width={150} height={40} />

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
			<HeroSection />
			<StatsSection />
			<FeatureSection />
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
		</main>
	);
}
