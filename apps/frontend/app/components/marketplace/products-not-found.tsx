"use client";

import { useTranslations } from "@/app/hooks/useTranslations";
import { PackageSearch } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

type ProductsNotFoundProps = {
	setPriceRange: Dispatch<SetStateAction<[number, number]>>;
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

export default function ProductsNotFound({
	setPriceRange,
	setSelectedCategories,
}: ProductsNotFoundProps) {
	const { t } = useTranslations();

	const clearFilters = () => {
		setPriceRange([0, 1500]);
		setSelectedCategories([]);
	};

	return (
		<section className="flex flex-col items-center justify-center space-y-4 mx-auto">
			<PackageSearch className="text-[#9ea1ac] w-12 h-12" />
			<h2 className="font-bold text-2xl">{t("common.noProducts.title")}</h2>
			<p>{t("common.noProducts.description")}</p>
			<Button onClick={clearFilters}>
				{t("common.noProducts.clearFilters")}
			</Button>
		</section>
	);
}
