"use client";

import { useTranslations } from "@/app/hooks/useTranslations";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/app/components/ui/dialog";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

interface ShoppingCartModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

// Temporary mock data - replace with actual cart state management
const mockCartItems: CartItem[] = [
	{
		id: "1",
		name: "Mechanical Keyboard",
		price: 149.99,
		quantity: 1,
		image: "/images/products/keyboard.jpg",
	},
	{
		id: "2",
		name: "Wireless Mouse",
		price: 79.99,
		quantity: 2,
		image: "/images/products/mouse.jpg",
	},
];

export function ShoppingCartModal({
	isOpen,
	onOpenChange,
}: ShoppingCartModalProps) {
	const { t } = useTranslations();

	const updateQuantity = (itemId: string, change: number) => {
		// Implement quantity update logic
		console.log(t("common.cart.updateQuantity"), itemId, change);
	};

	const removeItem = (itemId: string) => {
		// Implement remove item logic
		console.log(t("common.cart.removeItem"), itemId);
	};

	const total = mockCartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ShoppingBag className="h-5 w-5" />
						{t("common.cart.title")} ({mockCartItems.length})
					</DialogTitle>
				</DialogHeader>

				<div className="mt-4 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
					{mockCartItems.length === 0 ? (
						<p className="text-center text-muted-foreground">
							{t("common.cart.empty")}
						</p>
					) : (
						mockCartItems.map((item) => (
							<div
								key={item.id}
								className="flex items-center gap-4 p-4 rounded-lg border"
							>
								<div className="relative h-16 w-16">
									<Image
										src={item.image}
										alt={item.name}
										fill
										className="object-cover rounded-md"
									/>
								</div>

								<div className="flex-1">
									<h3 className="font-medium">{item.name}</h3>
									<p className="text-sm text-muted-foreground">
										${item.price.toFixed(2)}
									</p>

									<div className="flex items-center gap-2 mt-2">
										<Button
											variant="outline"
											size="icon"
											className="h-8 w-8"
											onClick={() => updateQuantity(item.id, -1)}
											disabled={item.quantity <= 1}
											aria-label={t("common.cart.quantityDecrease")}
										>
											<Minus className="h-4 w-4" />
										</Button>
										<span className="w-8 text-center">{item.quantity}</span>
										<Button
											variant="outline"
											size="icon"
											className="h-8 w-8"
											onClick={() => updateQuantity(item.id, 1)}
											aria-label={t("common.cart.quantityIncrease")}
										>
											<Plus className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 ml-auto"
											onClick={() => removeItem(item.id)}
											aria-label={t("common.cart.removeItem")}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				<div className="mt-6 space-y-4">
					<div className="flex justify-between font-medium">
						<span>{t("common.cart.total")}</span>
						<span>${total.toFixed(2)}</span>
					</div>

					<Button className="w-full">
						{t("common.cart.proceedToCheckout")}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
