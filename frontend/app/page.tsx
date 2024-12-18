"use client";
import { FeatureSection } from "@/app/components/ui/feature-section";
import { HeroSection } from "@/app/components/ui/hero-section";
import { StatsSection } from "@/app/components/ui/stats-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <StatsSection />
      <FeatureSection />
    </main>
  );
}
