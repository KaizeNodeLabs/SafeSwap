import { products } from "@/constants/testDataProduct";
import { Card } from "@radix-ui/themes";
import { MessageSquareMore, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Bounded from "../components/Bounded";
import SubHeader from "../components/header/subheader/SubHeader";
import { ProductsPagination } from "../components/marketplace";
import { Button } from "../components/ui/button";
import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

export default function ProductList() {
	return (
		<>
			<SubHeader name="Product" />
			<Bounded title="Products">
				{products?.map((product) => (
					<Card key={product.id} className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="relative aspect-square max-w-cl">
								<Link href={`/products/${product.id}`}>
									<Image
										src={product.images[0].src}
										alt={product.images[0].alt}
										width={320}
										height={320}
										priority
										className="rounded-t-lg h-[320px] cursor-pointer"
									/>
								</Link>
							</div>
							<Link href={`/products/${product.id}`}>
								<CardTitle className="text-xl font-medium cursor-pointer hover:text-primary">
									{product.name}
								</CardTitle>
							</Link>
						</CardHeader>
						<CardContent>
							<p className="text-lg text-muted-foreground">
								{product.category}
							</p>
							<span className="text-3xl font-bold text-foreground">
								${product.price}
							</span>
						</CardContent>
						<CardFooter className="flex justify-between gap-2 items-center flex-wrap">
							<div className="flex flex-col m-auto">
								<Button className="mb-4">
									<ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									Add to Cart
								</Button>
								<div className="flex flex-row justify-around gap-2">
									<Button variant="secondary" className="text-[16px]">
										<MessageSquareMore className="mr-2 h-4 w-4" />
										Chat with Seller
									</Button>
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
				<ProductsPagination />
			</Bounded>
		</>
	);
}
