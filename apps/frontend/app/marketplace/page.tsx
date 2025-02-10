"use client";

import { MessageSquareMore, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ProductFilter from "@/components/marketplace/ProductFilter";
import ProductsNotFound from "@/components/marketplace/products-not-found";
import { ProductsPagination } from "@/components/marketplace/products-pagination";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "@/hooks/useTranslations";
import { products } from "@/lib/mocks/products";
import { generateProductSlug } from "@/utils/generateProductSlug";

const getProductKey = (id: number) => {
	switch (id) {
		case 1:
			return "macbook";
		case 2:
			return "galaxy";
		case 3:
			return "chair";
		case 4:
			return "coffee";
		case 5:
			return "shoes";
		case 6:
			return "earbuds";
		default:
			return "";
	}
};

export default function ProductList() {
	const { t } = useTranslations();
	const [priceRange, setPriceRange] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleApplyFilters = (filters: {
		categories: string[];
		priceRanges: string[];
	}) => {
		setSelectedCategories(filters.categories);
		setPriceRange(filters.priceRanges);
	};

	const filteredProducts = products.filter((product) => {
		// Filter by categories
		const matchesCategory =
			selectedCategories.length === 0 ||
			selectedCategories.includes(product.category);

		// Filter by price ranges
		const matchesPriceRange =
			priceRange.length === 0 ||
			priceRange.some((range) => {
				const [min, max] = range
					.split(" - ")
					.map((s) => Number.parseInt(s.replace("$", "")));
				return product.price >= min && (max ? product.price <= max : true);
			});

		return matchesCategory && matchesPriceRange;
	});

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="flex flex-col md:flex-row gap-6">
				{/* ProductFilter */}
				<aside className="w-full md:w-1/4">
					<ProductFilter onApplyFilters={handleApplyFilters} />
				</aside>

				{/* Product List */}
				<section className="flex-1 overflow-hidden">
					{filteredProducts.length <= 0 ? (
						<ProductsNotFound
							setPriceRange={() => setPriceRange([])}
							setSelectedCategories={() => setSelectedCategories([])}
						/>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredProducts.map((product) => (
								<Card
									key={product.id}
									className="hover:shadow-lg w-full max-w-[24rem] mx-auto sm:mx-0"
								>
									<CardHeader>
										<div className="aspect-square">
											<Link
												href={`/marketplace/${generateProductSlug(
													t(
														`common.products.items.${getProductKey(
															product.id,
														)}.name`,
													),
												)}`}
											>
												<Image
													src={product.images[0].src}
													alt={product.images[0].alt}
													width={320}
													height={320}
													priority
													className="w-full h-full rounded-t-lg cursor-pointer object-cover"
												/>
											</Link>
										</div>
										<p className="text-medium text-gray-500 px-4 pt-4">
											{t(
												`common.products.categories.${product.category.toLowerCase()}`,
											)}
										</p>
										<Link href={`/marketplace/${product.id}`}>
											<CardTitle className="text-xl font-medium cursor-pointer hover:underline pt-0">
												{t(
													`common.products.items.${getProductKey(
														product.id,
													)}.name`,
												)}
											</CardTitle>
										</Link>
									</CardHeader>
									<CardContent className="pt-4">
										<span className="text-3xl font-bold">
											{t("common.productList.currency")}
											{product.price}
										</span>
									</CardContent>
									<CardFooter className="flex flex-col gap-3">
										<Button className="w-full">
											<ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
											{t("common.productList.addToCart")}
										</Button>
										<Button variant="secondary" className="w-full">
											<MessageSquareMore className="mr-2 h-4 w-4" />
											{t("common.productList.chatWithSeller")}
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					)}
					<ProductsPagination />
				</section>
			</div>
		</div>
	);
}
