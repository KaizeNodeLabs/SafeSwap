"use client";

import { Categories } from "@/components/categories/page";
import { Advantages } from "@/components/home/advantages";
import { ExploreCategories } from "@/components/home/explore-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { HowSafeSwapWorks } from "@/components/home/how-safeswap-works";
import { Seller } from "@/components/home/seller";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<Hero />
			<ExploreCategories />
			<FeaturedProducts />
			<Advantages />
			<HowSafeSwapWorks />
			<Seller />
			<Testimonials />
		</main>
	);
}
