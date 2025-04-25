"use client";

import {
	Clock,
	Heart,
	MapPin,
	MessageSquareMore,
	Share2,
	ShoppingBag,
	Star,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Images from "@/components/products/Images";
import NotFound from "@/components/products/not-found";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
	const [product, setProduct] = useState<UIProduct | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

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
		<div className="grid grid-cols-3 gap-10 pb-3">
			<section className="col-span-3 lg:col-span-2">
				<Images images={product.images} />
			</section>

			<div className="space-y-6 col-span-3 lg:col-span-1">
				<section className="space-y-4">
					<div className="flex justify-between">
						<Badge>{product.category}</Badge>
						<p className="text-muted-foreground">
							{t("common.product.posted")}
						</p>
					</div>

					<div>
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<p className="text-3xl font-semibold mt-2">
							${product.price.toFixed(2)}
						</p>
					</div>

					<Badge variant={"outline"}>{t("common.product.condition")}</Badge>

					{product.description && (
						<Card>
							<CardContent className="p-4">
								<h3 className="font-medium mb-2">
									{t("common.product.description")}
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									{product.description}
								</p>
							</CardContent>
						</Card>
					)}

					<div className="flex flex-col justify-center items-center gap-3 w-full">
						<Button className="w-full">
							<ShoppingBag className="mr-2 h-4 w-4" />
							{t("common.product.buttons.buy")}
						</Button>
						<Button variant={"secondary"} className="w-full">
							<MessageSquareMore className="mr-2 h-4 w-4" />
							{t("common.productList.chatWithSeller")}
						</Button>
						<div className="flex justify-center items-center gap-2 w-full">
							<Button variant={"outline"} className="w-full">
								<Heart />
							</Button>
							<Button variant={"outline"} className="w-full">
								<Share2 />
							</Button>
						</div>
					</div>
				</section>

				<Separator />

				<section>
					<Card>
						<CardContent className="p-4 space-y-3">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarFallback>T</AvatarFallback>
									</Avatar>

									<div className="flex flex-col">
										<h3>TechTreasures</h3>
										<div className="flex items-center justify-center gap-1">
											<Star
												fill="#facc15"
												className="h-3 w-3 text-yellow-400"
											/>
											<p className="text-muted-foreground text-sm">
												{t("common.seller.reviews")}
											</p>
										</div>
									</div>
								</div>

								<p className="text-muted-foreground text-sm">
									{t("common.seller.memberSince")}
								</p>
							</div>

							<p className="flex items-center">
								<MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> San
								Francisco, CA
							</p>
							<p className="flex items-center">
								<Clock className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
								{t("common.seller.responseTime")}
							</p>

							<Button variant={"outline"} className="w-full">
								{t("common.seller.viewProfile")}
							</Button>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
};

export default ProductDetails;
