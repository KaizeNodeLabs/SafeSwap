"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "./product-card-skeleton";

import FilterModal from "@/components/marketplace/filter-modal";
import ProductsNotFound from "@/components/marketplace/products-not-found";
import { ProductsPagination } from "@/components/marketplace/products-pagination";
import ProductCard from "./product-card";

import useFilteredProducts from "@/hooks/useFilteredProducts";
import {
	GET_CATEGORIES,
	GET_PRODUCTS,
	GET_PRODUCT_IMAGES,
} from "@/lib/graphql/queries";
import type { FilterState } from "@/lib/types/filters";
import type {
	CategoriesData,
	ProductImagesData,
	ProductsData,
} from "@/lib/types/product";

const initialFilters: FilterState = {
	categories: [],
	priceRanges: [],
};

export default function ProductList() {
	const t = useTranslations();
	const [filters, setFilters] = useState<FilterState>(initialFilters);

	// State for data
	const [productsData, setProductsData] = useState<ProductsData | undefined>(
		undefined,
	);
	const [categoriesData, setCategoriesData] = useState<
		CategoriesData | undefined
	>(undefined);
	const [imagesData, setImagesData] = useState<ProductImagesData | undefined>(
		undefined,
	);

	// State for loading and error
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Fetch all data in parallel
				const [products, categories, images] = await Promise.all([
					GET_PRODUCTS(),
					GET_CATEGORIES(),
					GET_PRODUCT_IMAGES(),
				]);

				if (products) setProductsData(products);
				if (categories) setCategoriesData(categories);
				if (images) setImagesData(images);

				// If any of the requests failed, set an error
				if (!products || !categories || !images) {
					setError(new Error("Failed to fetch some data"));
				} else {
					setError(null);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error("An unknown error occurred"),
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// State for pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	// Reset to page 1 when filters or pageSize changes
	useEffect(() => {
		setCurrentPage(1);
	}, [filters, pageSize]);

	const filteredProducts = useFilteredProducts(
		productsData,
		categoriesData,
		imagesData,
		filters,
		loading,
	);

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filteredProducts.length / pageSize);

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
					<div className="grid sm:grid-cols-2 grid-cols lg:grid-cols-4 gap-4">
						{Array.from({ length: 8 }).map((_, index) => (
							<ProductCardSkeleton key={index} />
						))}
					</div>
				) : error ? (
					<div className="flex justify-center items-center h-64">
						<p>Error loading products. Please try again later.</p>
					</div>
				) : filteredProducts.length <= 0 ? (
					<ProductsNotFound onClear={handleClearFilters} />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{paginatedProducts.map((product) => (
							<ProductCard key={product.id} product={product} t={t} />
						))}
					</div>
				)}
				<ProductsPagination
					currentPage={currentPage}
					totalPages={totalPages}
					setCurrentPage={setCurrentPage}
					pageSize={pageSize}
					setPageSize={setPageSize}
				/>
			</section>
		</>
	);
}
