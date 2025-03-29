import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FormattedProduct } from "@/lib/types/product";
import { generateProductSlug } from "@/utils/generateProductSlug";
import { MessageSquareMore, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER_IMAGE = "/placeholder.png";
type TFunction = ReturnType<typeof useTranslations>;
interface ProductCardProps {
	product: FormattedProduct;
	t: TFunction;
}

export default function ProductCard({ product, t }: ProductCardProps) {
	return (
		<Card key={product.id} className="hover:shadow-lg flex flex-col h-full">
			<CardHeader className="flex-grow-0">
				<div className="w-full relative">
					<Link
						href={`/marketplace/${product.slug || generateProductSlug(product.name)}`}
					>
						<div className="w-full h-64 relative">
							<Image
								src={product.images[0]?.src || PLACEHOLDER_IMAGE}
								alt={product.images[0]?.alt || product.name}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								priority
								className="rounded-t-lg cursor-pointer object-cover"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.onerror = null;
									target.src = PLACEHOLDER_IMAGE;
								}}
							/>
						</div>
					</Link>
				</div>
				<p className="text-medium text-gray-500 px-4 pt-4">
					{product.category}
				</p>
				<Link
					href={`/marketplace/${product.slug || generateProductSlug(product.name)}`}
				>
					<CardTitle className="text-xl font-medium cursor-pointer hover:underline pt-0">
						{product.name}
					</CardTitle>
				</Link>
			</CardHeader>
			<CardContent className="pt-4 flex-grow">
				<span className="text-3xl font-bold">
					{t("common.productList.currency")}
					{product.price.toFixed(2)}
				</span>
			</CardContent>
			<CardFooter className="flex flex-col gap-3 mt-auto">
				<Button className="w-full">
					<ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					{t("common.productList.buy")}
				</Button>
				<Button variant="secondary" className="w-full">
					<MessageSquareMore className="mr-2 h-4 w-4" />
					{t("common.productList.chatWithSeller")}
				</Button>
			</CardFooter>
		</Card>
	);
}
