import Bounded from "@/app/components/Bounded";
import SubHeader from "@/app/components/header/subheader/SubHeader";
import Images from "@/app/components/products/Images";
import { Button } from "@/app/components/ui/button";
import { products } from "@/constants/testDataProduct";
import { Product } from "@/entities/Product";
import { useUtils } from "@/utils/utils.hook";
import { Share2, ShoppingCart, Star } from "lucide-react";

interface ProductDetailsProps {
	params: {
		productId: string;
	};
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
	const getProductById = (id: number): Product | undefined => {
		return products.find((product) => product.id === id);
	};

	const { renderStars } = useUtils();
	const product = getProductById(parseInt(params.productId));

	return (
		<>
			<SubHeader name="Product" />
			<Bounded title="Product Details">
				<div className="flex justify-center w-2/3 gap-10 mx-auto py-10">
					{product && (
						<section className="w-1/2">
							<Images images={product.images} />
						</section>
					)}

					<section className="w-1/2 space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-foreground">
								{product?.name}
							</h1>
							<p className="text-primary text-xl font-semibold mt-3">$98.00</p>
						</div>

						<div>
							<h3 className="font-medium mb-2 text-foreground">Category:</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{product?.category}
							</p>
						</div>

						<div>
							<h3 className="font-medium mb-2 text-foreground">Quantity:</h3>
							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" className="px-3">
									-
								</Button>
								<span className="text-foreground">1</span>
								<Button variant="outline" size="sm" className="px-3">
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
										return (
											<Star
												key={index}
												className="h-5 w-5 text-muted-foreground"
											/>
										);
									}
								})}
							<span className="ml-2 text-sm text-muted-foreground">
								{product?.starts.toFixed(1)} / 5
							</span>
						</div>

						<div>
							<h3 className="font-medium mb-2 text-foreground">Description:</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
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
				</div>
			</Bounded>
		</>
	);
};

export default ProductDetails;
