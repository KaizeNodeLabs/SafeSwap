"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { PackageSearch } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import NotFound from "../shared/not-found";

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
      <NotFound
        icon={PackageSearch}
        title={t("common.noProducts.title")}
        description={t("common.noProducts.description")}
      />

      <Button onClick={clearFilters}>
        {t("common.noProducts.clearFilters")}
      </Button>
    </section>
  );
}
