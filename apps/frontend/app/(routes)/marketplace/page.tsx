"use client";

import { MessageSquareMore, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import FilterModal from "@/components/marketplace/filter-modal";
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
import { FilterState } from "@/lib/types/filters";
import { generateProductSlug } from "@/utils/generateProductSlug";

const initialFilters: FilterState = {
	categories: [],
	priceRanges: [],
};

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
	const [filters, setFilters] = useState<FilterState>(initialFilters);
	const [filteredProducts, setFilteredProducts] = useState(products);

	useEffect(() => {
		const newFilteredProducts = products.filter((product) => {
			const categoryMatch =
				filters.categories.length === 0 ||
				filters.categories.includes(product.category);
			const priceMatch =
				filters.priceRanges.length === 0 ||
				filters.priceRanges.some(
					(range) => product.price >= range.min && product.price <= range.max,
				);
			return categoryMatch && priceMatch;
		});
		setFilteredProducts(newFilteredProducts);
	}, [filters]);

	const handleClearFilters = () => {
		setFilters(initialFilters);
	};

	return (
		<>
			<div className="flex justify-between mb-8">
				<h1 className="text-4xl font-bold  mt-8 sm:mt-0">Marketplace</h1>
				<FilterModal />
			</div>
			{/* ProductFilter */}
			{/* <Filters onFiltersChange={setFilters} /> */}

			{/* Product List */}
			<section className="flex-1 mt-6">
				{filteredProducts.length <= 0 ? (
					<ProductsNotFound onClear={handleClearFilters} />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filteredProducts.map((product) => (
							<Card key={product.id} className="hover:shadow-lg">
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
									<Link
										href={`/marketplace/${generateProductSlug(
											t(
												`common.products.items.${getProductKey(
													product.id,
												)}.name`,
											),
										)}`}
									>
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
										<ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										{t("common.productList.buy")}
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
		</>
	);
}
