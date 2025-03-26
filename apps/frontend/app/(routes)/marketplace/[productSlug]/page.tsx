"use client";

import { Share2, ShoppingBag, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Images from "@/components/products/Images";
import NotFound from "@/components/products/not-found";
import { Button } from "@/components/ui/button";
import { useUtils } from "@/hooks/useUtils";
import {
	GET_CATEGORIES,
	GET_PRODUCTS,
	GET_PRODUCT_IMAGES,
} from "@/lib/graphql/queries";
import type {
	CategoriesData,
	FormattedProduct,
	ProductImagesData,
	ProductsData,
} from "@/lib/types/product";
import { generateProductSlug } from "@/utils/generateProductSlug";

interface ProductDetailsProps {
	params: {
		productSlug: string;
	};
}

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

interface UIProduct extends FormattedProduct {
	rating?: number;
	description?: string;
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
	const t = useTranslations();
	const { renderStars } = useUtils();
	const [product, setProduct] = useState<UIProduct | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [quantity, setQuantity] = useState(1);

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

	useEffect(() => {
		if (
			productsData?.products &&
			categoriesData?.categories &&
			imagesData?.productImages
		) {
			// Create a map of categories for easy lookup
			const categoriesMap: Record<string, string> = {};
			for (const category of categoriesData.categories) {
				categoriesMap[category.id] = category.name;
			}

			// Create a map of product images
			const productImagesMap: Record<string, { src: string; alt: string }[]> =
				{};
			for (const image of imagesData.productImages) {
				if (!productImagesMap[image.productId]) {
					productImagesMap[image.productId] = [];
				}
				productImagesMap[image.productId].push({
					src: image.imageUrl,
					alt: "Product image",
				});
			}

			// Find the product by slug
			const dbProduct = productsData.products.find(
				(p) =>
					p.slug === params.productSlug ||
					generateProductSlug(p.name) === params.productSlug,
			);

			if (dbProduct) {
				// Transform to UI product with additional properties
				const uiProduct: UIProduct = {
					id: dbProduct.id,
					name: dbProduct.name,
					slug: dbProduct.slug,
					price:
						typeof dbProduct.price === "string"
							? Number.parseFloat(dbProduct.price)
							: dbProduct.price,
					category: categoriesMap[dbProduct.categoryId] || "Unknown",
					condition: dbProduct.condition ? [dbProduct.condition] : [],
					images: productImagesMap[dbProduct.id] || [
						{
							src: PLACEHOLDER_IMAGE,
							alt: `${dbProduct.name} image`,
						},
					],
					description: dbProduct.description,
					rating: 4.5,
				};

				setProduct(uiProduct);
			}
		}
	}, [productsData, categoriesData, imagesData, params.productSlug]);

	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecreaseQuantity = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">Loading...</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-64">
				Error loading product data. Please try again later.
			</div>
		);
	}

	if (!product) {
		return <NotFound />;
	}

	return (
		<div className="flex flex-col md:flex-row justify-center gap-10">
			<section className="w-full md:w-1/2">
				<Images images={product.images} />
			</section>

			<section className="w-full md:w-1/2 space-y-6">
				<div>
					<h1 className="text-3xl font-bold">{product.name}</h1>
					<p className="text-zinc-600 text-xl font-semibold mt-3">
						${product.price.toFixed(2)}
					</p>
				</div>

				<div>
					<h3 className="font-medium mb-2">{t("common.product.category")}:</h3>
					<p className="text-gray-700 text-sm leading-relaxed">
						{product.category}
					</p>
				</div>

				<div>
					<h3 className="font-medium mb-2">{t("common.product.quantity")}:</h3>
					<div className="flex items-center gap-2">
						<Button
							size="icon"
							variant="secondary"
							aria-label={t("common.product.buttons.decrease")}
							onClick={handleDecreaseQuantity}
						>
							-
						</Button>
						<span>{quantity}</span>
						<Button
							size="icon"
							variant="secondary"
							aria-label={t("common.product.buttons.increase")}
							onClick={handleIncreaseQuantity}
						>
							+
						</Button>
					</div>
				</div>

				{product.rating && (
					<div className="mt-4 flex items-center">
						{renderStars(product.rating).map((star, index) => {
							if (star === "filled") {
								return <Star key={index} className="h-5 w-5 text-yellow-400" />;
							}
							if (star === "half") {
								return (
									<Star
										key={index}
										className="h-5 w-5 text-yellow-400 opacity-50"
									/>
								);
							}
							return <Star key={index} className="h-5 w-5 text-gray-300" />;
						})}
						<span className="ml-2 text-sm text-gray-600">
							{product.rating.toFixed(1)} {t("common.product.reviews")}
						</span>
					</div>
				)}

				{product.description && (
					<div>
						<h3 className="font-medium mb-2">
							{t("common.product.description")}:
						</h3>
						<p className="text-gray-700 text-sm leading-relaxed">
							{product.description}
						</p>
					</div>
				)}

				<div className="flex justify-center items-center gap-3">
					<Button className="w-9/12">
						<ShoppingBag className="mr-2 h-4 w-4" />
						{t("common.product.buttons.buy")}
					</Button>
					<Button>
						<Share2 className="mr-2 h-4 w-4" />
						{t("common.product.buttons.share")}
					</Button>
				</div>
			</section>
		</div>
	);
};

export default ProductDetails;
