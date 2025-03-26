import { FilterState } from "@/lib/types/filters";
import {
	CategoriesData,
	FormattedProduct,
	ProductImagesData,
	ProductsData,
} from "@/lib/types/product";
import { useEffect, useState } from "react";

const PLACEHOLDER_IMAGE = "/placeholder.png";

export default function useFilteredProducts(
	productsData: ProductsData | undefined,
	categoriesData: CategoriesData | undefined,
	imagesData: ProductImagesData | undefined,
	filters: FilterState,
	loading: boolean,
) {
	const [filteredProducts, setFilteredProducts] = useState<FormattedProduct[]>(
		[],
	);

	useEffect(() => {
		if (productsData?.products && !loading) {
			const categoriesMap: Record<string, string> = {};

			// Replace forEach with for...of loop
			if (categoriesData?.categories) {
				for (const category of categoriesData.categories) {
					categoriesMap[category.id] = category.name;
				}
			}

			const productImagesMap: Record<string, { src: string; alt: string }[]> =
				{};

			// Replace forEach with for...of loop
			if (imagesData?.productImages) {
				for (const image of imagesData.productImages) {
					if (!productImagesMap[image.productId]) {
						productImagesMap[image.productId] = [];
					}
					productImagesMap[image.productId].push({
						src: image.imageUrl,
						alt: "Product image",
					});
				}
			}

			const formattedProducts: FormattedProduct[] = productsData.products.map(
				(product) => ({
					id: product.id,
					name: product.name,
					slug: product.slug,
					price:
						typeof product.price === "string"
							? Number.parseFloat(product.price)
							: product.price,
					category: categoriesMap[product.categoryId] || "Unknown",
					images: productImagesMap[product.id] || [
						{ src: PLACEHOLDER_IMAGE, alt: `${product.name} image` },
					],
					condition: [product.condition || "New"],
				}),
			);

			setFilteredProducts(
				formattedProducts.filter(
					(product) =>
						(filters.categories.length === 0 ||
							filters.categories.includes(product.category)) &&
						(filters.priceRanges.length === 0 ||
							filters.priceRanges.some(
								(range) =>
									product.price >= range.min && product.price <= range.max,
							)),
				),
			);
		}
	}, [productsData, categoriesData, imagesData, filters, loading]);

	return filteredProducts;
}
