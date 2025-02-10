"use client";

import { PackageX } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NotFound from "../common/not-found"; 

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
