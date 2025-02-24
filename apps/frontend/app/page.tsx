"use client";

import AdvantagesSection from "@/components/home/advantages-section";
import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowSafeSwapWorks } from "@/components/home/how-safeswap-works";
import { SellerSection } from "@/components/home/seller-section";
import { StatsSection } from "@/components/home/stats-section";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<HeroSection />
			<StatsSection />
			<FeatureSection />
			<AdvantagesSection />
			<HowSafeSwapWorks />
			<SellerSection />
		</main>
	);
}
