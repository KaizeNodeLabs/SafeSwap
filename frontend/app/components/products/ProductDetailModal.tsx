import { Button } from "@/app/components/ui/button";
import ImageCarousel from "../ui/image-carrousel";

import { ShoppingCart } from "lucide-react";
interface Product {
	id: number;
	images: { src: string; alt: string }[];
	name: string;
	description: string;
	price: number;
	category: string;
}
import { Star } from "lucide-react";

function ProductDetailModal({
	isOpen,
	onClose,
	product,
}: {
	isOpen: boolean;
	onClose: () => void;
	product: Product | null;
}) {
	if (!product) return null;
	const renderStars = (rating: number) => {
		const filledStars = Math.floor(rating);
		const halfStars = rating % 1 >= 0.5 ? 1 : 0;
		const emptyStars = 5 - (filledStars + halfStars);

		return [
			...Array(filledStars).fill("filled"),
			...Array(halfStars).fill("half"),
			...Array(emptyStars).fill("empty"),
		];
	};

	const rating = 4.3;

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity ${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
		>
			<div
				className="relative bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg"
				role="dialog"
				aria-labelledby="product-detail-modal"
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				>
					<span className="sr-only">Close</span>✕
				</button>

				<h2 className="text-2xl font-bold" id="product-detail-modal">
					{product.name}
				</h2>
				<div className="mt-4">
					<div className="flex flex-wrap justify-center gap-4">
						<ImageCarousel images={product.images} />
					</div>
					<p className="mt-4 text-lg text-gray-600">{product.category}</p>
					<p className="mt-2 text-lg">
						{product.price ? `$${product.price}` : "Price not available"}
					</p>
					<p className="mt-2 text-sm text-gray-500">{product.description}</p>
				</div>

				<div className="mt-4 flex items-center">
					{renderStars(rating).map((star, index) => {
						if (star === "filled") {
							return <Star key={index} className="h-5 w-5 text-yellow-400" />;
						} else if (star === "half") {
							return (
								<Star
									key={index}
									className="h-5 w-5 text-yellow-400 opacity-50"
								/>
							);
						} else {
							return <Star key={index} className="h-5 w-5 text-gray-300" />;
						}
					})}
					<span className="ml-2 text-sm text-gray-600">
						{rating.toFixed(1)} / 5
					</span>
				</div>

				<div className="mt-6 gap-4">
					<Button className="bg-black text-white">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button>
				</div>

				<div className="mt-6 flex justify-end">
					<Button
						onClick={onClose}
						className="bg-gray-300 text-black px-4 py-2 rounded-md"
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailModal;
