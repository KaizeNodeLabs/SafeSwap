import { Share2, ShoppingCart, Star } from "lucide-react";

import Images from "@/app/components/products/Images";
import SubHeader from "@/app/components/shared/sub-header";
import { Button } from "@/app/components/ui/button";
import { products } from "@/constants/testDataProduct";
import { Product } from "@/entities/Product";
import { useUtils } from "@/utils/utils.hook";
import { generateProductSlug } from "@/utils/generateProductSlug";

interface ProductDetailsProps {
	params: {
		productSlug: string;
	};
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
	const getProductByName = (slug: string): Product | undefined => {
		return products.find((product) => generateProductSlug(product.name) === slug);
	};

	const { renderStars } = useUtils();
	const product = getProductByName(params.productSlug);

	return (
		<>
			<SubHeader name="Product" />
			<main className="flex justify-center w-2/3 gap-10 mx-auto py-10">
				{product && (
					<section className="w-1/2">
						<Images images={product.images} />
					</section>
				)}

				<section className="w-1/2 space-y-6">
					<div>
						<h1 className="text-3xl font-bold">{product?.name}</h1>
						<p className="text-zinc-600 text-xl font-semibold mt-3">$98.00</p>
					</div>

					<div>
						<h3 className="font-medium mb-2">Category:</h3>
						<p className="text-gray-700 text-sm leading-relaxed">
							{product?.category}
						</p>
					</div>

					<div>
						<h3 className="font-medium mb-2">Quantity:</h3>
						<div className="flex items-center gap-2">
							<Button size="icon" variant="secondary">
								-
							</Button>
							<span>1</span>
							<Button size="icon" variant="secondary">
								+
							</Button>
						</div>
					</div>

					<div className="mt-4 flex items-center">
						{product &&
							renderStars(product.starts).map((star, index) => {
								if (star === "filled") {
									return (
										<Star key={index} className="h-5 w-5 text-yellow-400" />
									);
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
							{product?.starts.toFixed(1)} / 5
						</span>
					</div>

					<div>
						<h3 className="font-medium mb-2">Description:</h3>
						<p className="text-gray-700 text-sm leading-relaxed">
							{product?.description}
						</p>
					</div>

					<div className="flex justify-center items-center gap-3">
						<Button className="w-9/12">
							<ShoppingCart className="mr-2 h-4 w-4" />
							Add to Cart
						</Button>
						<Button>
							<Share2 className="mr-2 h-4 w-4" />
							Share
						</Button>
					</div>
				</section>
			</main>
		</>
	);
};

export default ProductDetails;
