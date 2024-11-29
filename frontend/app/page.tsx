"use client";

import { FeatureSection } from "@/app/components/ui/feature-section";
import { HeroSection } from "@/app/components/ui/hero-section";
import { StatsSection } from "@/app/components/ui/stats-section";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { SafeSwapLogo } from "./components/ui/SafeSwapLogo";
import { Footer } from "./components/ui/footer";

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
			<Footer />
		</main>
	);
}
