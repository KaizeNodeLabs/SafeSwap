"use client";
import { FeatureSection } from "@/app/components/ui/feature-section";
import Header from "@/app/components/ui/header";
import { HeroSection } from "@/app/components/ui/hero-section";
import { StatsSection } from "@/app/components/ui/stats-section";
import { Footer } from "./components/ui/footer";


export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<HeroSection />
			<StatsSection />
			<FeatureSection />
		</main>
	);
}
