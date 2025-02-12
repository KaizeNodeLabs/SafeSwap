"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { PackageX } from "lucide-react";
import NotFound from "../shared/not-found";

const ProductNotFound = () => {
	const { t } = useTranslations();

	return (
		<>
			<NotFound
				icon={PackageX}
				title={t("common.notFound.title")}
				description={t("common.notFound.description")}
			/>
		</>
	);
};

export default ProductNotFound;
