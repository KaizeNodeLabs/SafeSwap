"use client";

import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";
import { SellerSection } from "@/components/home/seller-section";
import { StatsSection } from "@/components/home/stats-section";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<HeroSection />
			<StatsSection />
			<FeatureSection />
			<SellerSection />
		</main>
	);
}
