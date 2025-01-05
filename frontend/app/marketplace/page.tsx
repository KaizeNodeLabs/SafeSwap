"use client";

import { CirclePlus, MessageSquareMore, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AddProductModal from "@/app/components/marketplace/add-product-modal";
import BreadcrumbNavigation from "@/app/components/marketplace/breadcrumb-navigation";
import { ProductsPagination } from "@/app/components/marketplace/products-pagination";
import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { products } from "@/constants/testDataProduct";

export default function ProductList() {
	const [showModal, setShowModal] = useState(false);
	// const filteredProducts = products.filter(
	//   (product) =>
	//     (searchTerm === "" ||
	//       product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
	//     (selectedCategories.length === 0 ||
	//       selectedCategories.includes(product.category)) &&
	//     product.price >= priceRange[0] &&
	//     product.price <= priceRange[1]
	// );

	return (
		<main className="container p-6 mx-auto">
			<section className="flex items-end justify-between">
				<BreadcrumbNavigation />
				<div className="flex justify-end">
					<Button onClick={() => setShowModal(true)}>
						<CirclePlus className="mr-2 h-4 w-4" />
						Add Product
					</Button>
				</div>
			</section>
			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{products?.map((product) => (
					<Card
						key={product.id}
						className="hover:shadow-lg mx-auto sm:mx-0 max-w-[24rem] sm:w-auto"
					>
						<CardHeader>
							<div className="aspect-square">
								<Link href={`/marketplace/${product.id}`}>
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
								{product.category}
							</p>
							<Link href={`/marketplace/${product.id}`}>
								<CardTitle className="text-xl font-medium cursor-pointer hover:underline pt-0">
									{product.name}
								</CardTitle>
							</Link>
						</CardHeader>
						<CardContent className="pt-4">
							<span className="text-3xl font-bold">${product.price}</span>
						</CardContent>
						<CardFooter className="flex flex-col gap-3">
							<Button className="w-full">
								<ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								Add to Cart
							</Button>
							<Button variant="secondary" className="w-full">
								<MessageSquareMore className="mr-2 h-4 w-4" />
								Chat with Seller
							</Button>
						</CardFooter>
					</Card>
				))}
			</section>
			<ProductsPagination />
			<AddProductModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</main>
	);
}
