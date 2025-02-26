"use client";

import NotFound from "@/app/not-found";
import ChatMessage from "@/components/shopping/ChatMessage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/useTranslations";
import { products } from "@/lib/mocks/products";
import { getProductKey } from "@/utils/getProductKey";
import {
	AlertTriangle,
	CircleCheckBig,
	MessageSquare,
	Send,
	ShoppingBag,
} from "lucide-react";
import Image from "next/image";

interface ShoppingDetailsPageProps {
	params: {
		id: string;
	};
}

const messages = [
	{
		sender: "Seller",
		message:
			"Hello! Thank you for your purchase. Let me know if you have any questions.",
		timestamp: "6/1/2023, 4:00:00 PM",
		isBuyer: false,
	},
	{
		sender: "Buyer",
		message: "Hi! When can I expect the item to be shipped?",
		timestamp: "6/1/2023, 4:05:00 PM",
		isBuyer: true,
	},
	{
		sender: "Seller",
		message:
			"I'll be shipping it out tomorrow. You should receive it within 3-5 business days.",
		timestamp: "6/1/2023, 4:10:00 PM",
		isBuyer: false,
	},
	{
		sender: "Buyer",
		message: "Great! Do you provide a tracking number?",
		timestamp: "6/1/2023, 4:15:00 PM",
		isBuyer: true,
	},
	{
		sender: "Seller",
		message: "Yes, I'll send you the tracking number once it's shipped.",
		timestamp: "6/1/2023, 4:20:00 PM",
		isBuyer: false,
	},
	{
		sender: "Seller",
		message: "Thank you so much.",
		timestamp: "6/1/2023, 4:21:00 PM",
		isBuyer: false,
	},
];

export default function ShoppingDetailsPage({
	params,
}: ShoppingDetailsPageProps) {
	const { t } = useTranslations();

	const product = products.find((product) => Number(params.id) === product.id);

	if (!product) {
		return <NotFound />;
	}

	return (
		<section className="py-4 space-y-10">
			<h1 className="capitalize text-3xl font-bold">shopping details</h1>

			<div className="grid lg:grid-cols-2 max-w-md md:max-w-5xl justify-center gap-5 mx-auto">
				<Card>
					<CardHeader>
						<div className="aspect-square">
							<Image
								src={product.images[0].src}
								alt={product.images[0].alt}
								width={320}
								height={320}
								priority
								className="mx-auto object-cover w-full h-full rounded-t-lg"
							/>
						</div>
						<p className="text-medium text-gray-500 px-4 pt-4">
							{t(
								`common.products.categories.${product.category.toLowerCase()}`,
							)}
						</p>

						<CardTitle className="text-xl font-medium pt-0">
							{t(`common.products.items.${getProductKey(product.id)}.name`)}
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<span className="text-3xl font-bold">
							{t("common.productList.currency")}
							{product.price}
						</span>
					</CardContent>
					<CardFooter className="flex flex-col gap-3 items-start">
						<p className="text-gray-700 text-sm leading-relaxed max-w-md">
							{product.description}
						</p>
						<Badge variant={"secondary"}>
							{t("shopping.escrowStatus.pending")}
						</Badge>
						<div className="flex flex-col md:block gap-2 mx-auto md:m-0">
							<Button className="md:mr-2">
								<ShoppingBag className="mr-2 h-4 w-4" />
								{t("shopping.pay")}
							</Button>
							<Button className="md:mr-2" variant={"outline"}>
								<CircleCheckBig className="mr-2 h-4 w-4" />
								{t("shopping.markAsReceived")}
							</Button>
							<Button variant={"destructive"} className="md:mt-2">
								<AlertTriangle className="mr-2 h-4 w-4" />
								{t("shopping.openDispute")}
							</Button>
						</div>
					</CardFooter>
				</Card>

				<Card className="flex flex-col h-full">
					<CardHeader className="flex-none">
						<CardTitle className="text-xl font-medium items-center flex">
							<MessageSquare className="mr-2 h-4 w-4" />
							Chat
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col flex-1 p-4">
						<div className="flex-1 overflow-y-auto max-h-[600px] min-h-[600px] pr-2">
							<div className="space-y-4">
								{messages.map((msg, index) => (
									<ChatMessage key={index} {...msg} />
								))}
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col items-start md:flex-row gap-2 md:items-center mt-4 pt-4 border-t">
						<Input
							type="text"
							placeholder={`${t("shopping.typeMessageHero")}`}
						/>
						<Button>
							<Send className="mr-2 h-4 w-4" />
							{t("shopping.send")}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
