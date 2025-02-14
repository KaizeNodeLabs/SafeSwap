"use client";

import { Share2, ShoppingBag, Star } from "lucide-react";

import Images from "@/components/products/Images";
import NotFound from "@/components/products/not-found";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { useUtils } from "@/hooks/useUtils";
import { products } from "@/lib/mocks/products";
import type { Product } from "@/lib/types/product";
import { generateProductSlug } from "@/utils/generateProductSlug";

interface ProductDetailsProps {
	params: {
		productSlug: string;
	};
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
	const { t } = useTranslations();
	const { renderStars } = useUtils();

	const getProductByName = (slug: string): Product | undefined => {
		return products.find(
			(product) => generateProductSlug(product.name) === slug,
		);
	};

	const product = getProductByName(params.productSlug);

	if (!product) {
		return <NotFound />;
	}

	return (
		<div className="flex justify-center gap-10">
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
					<h3 className="font-medium mb-2">{t("common.product.category")}:</h3>
					<p className="text-gray-700 text-sm leading-relaxed">
						{product?.category}
					</p>
				</div>

				<div>
					<h3 className="font-medium mb-2">{t("common.product.quantity")}:</h3>
					<div className="flex items-center gap-2">
						<Button
							size="icon"
							variant="secondary"
							aria-label={t("common.product.buttons.decrease")}
						>
							-
						</Button>
						<span>1</span>
						<Button
							size="icon"
							variant="secondary"
							aria-label={t("common.product.buttons.increase")}
						>
							+
						</Button>
					</div>
				</div>

				<div className="mt-4 flex items-center">
					{product &&
						renderStars(product.starts).map((star, index) => {
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
						{product?.starts.toFixed(1)} {t("common.product.reviews")}
					</span>
				</div>

				<div>
					<h3 className="font-medium mb-2">
						{t("common.product.description")}:
					</h3>
					<p className="text-gray-700 text-sm leading-relaxed">
						{product?.description}
					</p>
				</div>

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
