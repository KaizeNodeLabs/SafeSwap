import { Button } from "@/app/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import ImageCarousel from "../ui/image-carrousel";

interface Product {
	id: number;
	images: { src: string; alt: string }[];
	name: string;
	description: string;
	price: number;
	category: string;
}

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
			className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
		>
			<div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
			<div
				className="relative w-full max-w-md mx-auto p-6 rounded-lg shadow-lg bg-background border"
				role="dialog"
				aria-labelledby="product-detail-modal"
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
				>
					<span className="sr-only">Close</span>✕
				</button>

				<h2
					className="text-2xl font-bold text-foreground"
					id="product-detail-modal"
				>
					{product.name}
				</h2>
				<div className="mt-4">
					<div className="flex flex-wrap justify-center gap-4">
						<ImageCarousel images={product.images} />
					</div>
					<p className="mt-4 text-lg text-muted-foreground">
						{product.category}
					</p>
					<p className="mt-2 text-lg text-foreground">
						{product.price ? `$${product.price}` : "Price not available"}
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						{product.description}
					</p>
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
							return (
								<Star key={index} className="h-5 w-5 text-muted-foreground" />
							);
						}
					})}
					<span className="ml-2 text-sm text-muted-foreground">
						{rating.toFixed(1)} / 5
					</span>
				</div>

				<div className="mt-6 gap-4">
					<Button>
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button>
				</div>

				<div className="mt-6 flex justify-end">
					<Button variant="secondary" onClick={onClose}>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailModal;
