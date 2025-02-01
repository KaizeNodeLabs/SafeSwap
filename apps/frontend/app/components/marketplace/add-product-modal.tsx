"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { useTranslations } from "@/app/hooks/useTranslations";
import React from "react";

interface AddProductModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { t } = useTranslations();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6 dark:bg-neutral-950">
				<h2 className="text-2xl text-center font-bold mb-4">
					{t("common.addProduct.title")}
				</h2>
				<form className="space-y-4">
					{/* Product Name */}
					<div>
						<Label htmlFor="product-name">{t("common.addProduct.name")}</Label>
						<Input
							id="product-name"
							type="text"
							placeholder={t("common.addProduct.namePlace")}
						/>
					</div>

					{/* Description */}
					<div>
						<Label htmlFor="description">
							{t("common.addProduct.description")}
						</Label>
						<Textarea
							id="description"
							placeholder={t("common.addProduct.descriptionPlace")}
							rows={4}
						/>
					</div>

					{/* Price */}
					<div>
						<Label htmlFor="price">{t("common.addProduct.price")}</Label>
						<div className="relative mt-1">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								$
							</span>
							<Input
								id="price"
								type="text"
								placeholder={t("common.addProduct.pricePlace")}
								pattern="^\d+(\.\d{1,2})?$"
								className="pl-7"
							/>
						</div>
					</div>

					{/* Category */}
					<div>
						<Label htmlFor="category">{t("common.addProduct.category")}</Label>
						<Select>
							<SelectTrigger id="category">
								<SelectValue
									placeholder={t("common.addProduct.categoryPlace")}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="electronics">
									{t("common.addProduct.categories.electronics")}
								</SelectItem>
								<SelectItem value="furniture">
									{t("common.addProduct.categories.furniture")}
								</SelectItem>
								<SelectItem value="appliances">
									{t("common.addProduct.categories.appliances")}
								</SelectItem>
								<SelectItem value="sports">
									{t("common.addProduct.categories.sports")}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Image Upload */}
					<div>
						<Label htmlFor="image">{t("common.addProduct.imageUpload")}</Label>
						<Input id="image" type="file" />
					</div>
				</form>
				{/* Buttons Save and Close */}
				<div className="flex justify-end space-x-4 mt-6">
					<Button variant="secondary" onClick={onClose}>
						{t("common.addProduct.close")}
					</Button>
					<Button>{t("common.addProduct.save")}</Button>
				</div>
			</div>
		</div>
	);
};

export default AddProductModal;
