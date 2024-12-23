"use client";

import { FeatureSection } from "@/app/components/home/feature-section";
import { HeroSection } from "@/app/components/home/hero-section";
import { StatsSection } from "@/app/components/home/stats-section";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<HeroSection />
			<StatsSection />
			<FeatureSection />
		</main>
	);
}
