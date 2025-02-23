"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useTranslations } from "@/hooks/useTranslations";
import { products } from "@/lib/mocks/products";
import { generateProductSlug } from "@/utils/generateProductSlug";
import {
	ArrowLeft,
	ArrowRight,
	MessageSquareMore,
	ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCarousel() {
	const { t } = useTranslations();
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsPerPage = 4;

	const handleNext = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex + 1) % Math.ceil(products.length / itemsPerPage),
		);
	};

	const handlePrevious = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + Math.ceil(products.length / itemsPerPage)) %
				Math.ceil(products.length / itemsPerPage),
		);
	};

	return (
		<div className="w-full max-w-6xl mx-auto my-8">
			<h2 className="text-2xl font-bold mb-4">
				{t("common.featuredProducts")}
			</h2>
			<div className="flex items-center justify-between">
				<Button
					className="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 z-10"
					onClick={handlePrevious}
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>

				<Carousel className="relative flex-1 overflow-hidden mx-4">
					<CarouselContent
						style={{
							transform: `translateX(-${currentIndex * (100 / (products.length / itemsPerPage))}%)`,
						}}
					>
						{products.map((product) => (
							<CarouselItem key={product.id} className="flex-[0_0_25%] px-2">
								<Card className="hover:shadow-lg">
									<CardHeader>
										<div className="aspect-square">
											<Link
												href={`/marketplace/${generateProductSlug(t(`common.products.items.${product.id}.name`))}`}
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
											href={`/marketplace/${generateProductSlug(t(`common.products.items.${product.id}.name`))}`}
										>
											<CardTitle className="text-xl font-medium cursor-pointer hover:underline pt-0">
												{t(`common.products.items.${product.id}.name`)}
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
											<ShoppingBag className="mr-2 h-4 w-4" />
											{t("common.productList.buy")}
										</Button>
										<Button variant="secondary" className="w-full">
											<MessageSquareMore className="mr-2 h-4 w-4" />
											{t("common.productList.chatWithSeller")}
										</Button>
									</CardFooter>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
				<Button
					className="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 z-10"
					onClick={handleNext}
				>
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}
