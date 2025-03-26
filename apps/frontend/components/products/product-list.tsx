"use client";

import FilterModal from "@/components/marketplace/filter-modal";
import ProductsNotFound from "@/components/marketplace/products-not-found";
import { ProductsPagination } from "@/components/marketplace/products-pagination";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import {
	GET_CATEGORIES,
	GET_PRODUCTS,
	GET_PRODUCT_IMAGES,
} from "@/lib/graphql/queries";
import { FilterState } from "@/lib/types/filters";
import {
	CategoriesData,
	ProductImagesData,
	ProductsData,
} from "@/lib/types/product";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProductCard from "./product-card";

const initialFilters: FilterState = {
	categories: [],
	priceRanges: [],
};

export default function ProductList() {
	const t = useTranslations();
	const [filters, setFilters] = useState<FilterState>(initialFilters);

	const {
		loading: productsLoading,
		error: productsError,
		data: productsData,
	} = useQuery<ProductsData>(GET_PRODUCTS);
	const { loading: categoriesLoading, data: categoriesData } =
		useQuery<CategoriesData>(GET_CATEGORIES);
	const { loading: imagesLoading, data: imagesData } =
		useQuery<ProductImagesData>(GET_PRODUCT_IMAGES);

	const loading = productsLoading || categoriesLoading || imagesLoading;
	const error = productsError;

	const filteredProducts = useFilteredProducts(
		productsData,
		categoriesData,
		imagesData,
		filters,
		loading,
	);

	const handleClearFilters = () => {
		setFilters(initialFilters);
	};

	return (
		<>
			<div className="flex justify-between mb-8">
				<h1 className="text-4xl font-bold mt-8 sm:mt-0">Marketplace</h1>
				<FilterModal />
			</div>

			<section className="flex-1 mt-6">
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<p>Loading products...</p>
					</div>
				) : error ? (
					<div className="flex justify-center items-center h-64">
						<p>Error loading products. Please try again later.</p>
					</div>
				) : filteredProducts.length <= 0 ? (
					<ProductsNotFound onClear={handleClearFilters} />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} t={t} />
						))}
					</div>
				)}
				<ProductsPagination />
			</section>
		</>
	);
}
