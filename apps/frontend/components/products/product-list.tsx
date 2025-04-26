"use client";

import { ProductsPagination } from "@/components/marketplace/products-pagination";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";

import useFormattedProducts from "@/hooks/useFormattedProducts";
import {
	GET_CATEGORIES,
	GET_PRODUCTS,
	GET_PRODUCT_IMAGES,
} from "@/lib/graphql/queries";
import type {
	CategoriesData,
	ProductImagesData,
	ProductsData,
} from "@/lib/types/product";
import MarketplaceFilters from "../marketplace/marketplace-filters";

export default function ProductList() {
	const t = useTranslations();

	const [productsData, setProductsData] = useState<ProductsData>();
	const [categoriesData, setCategoriesData] = useState<CategoriesData>();
	const [imagesData, setImagesData] = useState<ProductImagesData>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [products, categories, images] = await Promise.all([
					GET_PRODUCTS(),
					GET_CATEGORIES(),
					GET_PRODUCT_IMAGES(),
				]);

				if (products) setProductsData(products);
				if (categories) setCategoriesData(categories);
				if (images) setImagesData(images);

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

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	// Reset to page 1 when filters or pageSize changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally trigger effect when filters or pageSize changes
	useEffect(() => {
		setCurrentPage(1);
	}, [pageSize]);

	const formattedProducts = useFormattedProducts(
		productsData,
		categoriesData,
		imagesData,
		loading,
	);

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedProducts = formattedProducts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(formattedProducts.length / pageSize);

	return (
		<>
			<div className="flex justify-between mb-8">
				<h1 className="text-4xl font-bold mt-8 sm:mt-0">Marketplace</h1>
				<span className="text-sm text-gray-500">Showing 8 of 100 products</span>
			</div>
			<MarketplaceFilters />

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
				) : formattedProducts.length <= 0 ? (
					<p className="text-center text-gray-500">No products found.</p>
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
