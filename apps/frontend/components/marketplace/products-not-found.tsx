"use client";

import { PackageSearch } from "lucide-react";

import { useTranslations } from "@/hooks/useTranslations";
import NotFound from "../shared/not-found";
import { Button } from "../ui/button";

interface ProductsNotFoundProps {
	onClear: () => void;
}

export default function ProductsNotFound({ onClear }: ProductsNotFoundProps) {
	const { t } = useTranslations();

	return (
		<section className="flex flex-col items-center justify-center space-y-4 mx-auto">
			<NotFound
				icon={PackageSearch}
				title={t("common.noProducts.title")}
				description={t("common.noProducts.description")}
			/>

			<Button onClick={onClear}>{t("common.noProducts.clearFilters")}</Button>
		</section>
	);
}
