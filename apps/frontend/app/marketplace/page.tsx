"use client";

import { useTranslations } from "@/app/hooks/useTranslations";
import { CirclePlus, MessageSquareMore, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AddProductModal from "@/app/components/marketplace/add-product-modal";
import Filters from "@/app/components/marketplace/filters";
import { ProductsPagination } from "@/app/components/marketplace/products-pagination";
import BreadcrumbNavigation from "@/app/components/shared/breadcrumb-navigation";
import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { products } from "@/constants/testDataProduct";
import { generateProductSlug } from "@/utils/generateProductSlug";
import ProductsNotFound from "../components/marketplace/products-not-found";

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
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleAddProduct = () => {
		router.push("/marketplace/create-product");
	};

	const filteredProducts = products.filter(
		(product) =>
			product.price >= priceRange[0] &&
			product.price <= priceRange[1] &&
			(selectedCategories.length === 0 ||
				selectedCategories.includes(product.category)),
	);

	return (
		<main className="container p-6 mx-auto">
			<section className="flex items-end justify-between">
				<BreadcrumbNavigation />
				<div className="flex justify-end">
					<Button onClick={handleAddProduct}>
						<CirclePlus className="mr-2 h-4 w-4" />
						{t("common.productList.addProduct")}
					</Button>
				</div>
			</section>
			<div className="flex flex-col md:flex-row gap-6 mt-6">
				{/* Filters */}
				<aside className="w-full md:w-1/4">
					<Filters
						priceRange={priceRange}
						setPriceRange={setPriceRange}
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
					/>
				</aside>

				{/* Product List */}
				<section className="flex flex-col flex-1">
					{filteredProducts.length <= 0 ? (
						<ProductsNotFound
							setPriceRange={setPriceRange}
							setSelectedCategories={setSelectedCategories}
						/>
					) : (
						<div className="grid flex-grow grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredProducts.map((product) => (
								<Card
									key={product.id}
									className="hover:shadow-lg mx-auto sm:mx-0 max-w-[24rem] sm:w-auto"
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
													className="w-full h-full rounded-t-lg cursor-pointer"
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

			<AddProductModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</main>
	);
}
