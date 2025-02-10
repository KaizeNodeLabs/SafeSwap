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
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/marketplace">
            {t("common.notFound.browseMarketplace")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">{t("common.notFound.goHome")}</Link>
        </Button>
      </div>
    </>
  );
};

export default ProductNotFound;
