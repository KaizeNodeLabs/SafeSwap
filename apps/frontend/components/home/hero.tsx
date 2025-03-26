"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useStellarData } from "@/hooks/useStellarData";
import { useTranslations } from "next-intl";
import { FloatingSettings } from "./floating-settings";

export function Hero() {
  const t = useTranslations();
  const { networkStatus, gasFees, tradingVolume } = useStellarData();

  const normalizedStatus = networkStatus.toLowerCase().replace("...", "");
  const translatedStatus = t(
    `common.hero.stats.statusValue.${normalizedStatus}`
  );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 overflow-hidden dark:bg-gray-900 dark:text-white">
      <FloatingSettings />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background dark:from-primary/5 dark:via-gray-800 dark:to-gray-900" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)]" />

      <div className="relative z-10">
        <Logo
          width={200}
          height={50}
          className="mx-auto mb-8 transition-opacity duration-300"
        />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 dark:bg-primary/20 dark:text-primary/80">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-primary/70" />
          </span>
          {t("common.hero.networkStatus")}
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8 bg-clip-text from-primary to-primary/70 dark:text-primary">
          {t("common.hero.title.part1")}
          <span className="block mt-2">{t("common.hero.title.part2")}</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-[600px] mb-12 dark:text-gray-400">
          {t("common.hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/marketplace">
            <Button size="lg" className="group">
              {t("common.hero.exploreButton")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 mb-16 flex flex-col sm:mb-0 sm:flex-row gap-8 justify-center items-center text-sm text-muted-foreground dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" />
            {t("common.hero.stats.status")}:{" "}
            <span className="text-2m">{translatedStatus}</span>
          </div>
          <div>
            {t("common.hero.stats.volume")}:{" "}
            <span className="text-2m">{tradingVolume}</span>
          </div>
          <div>
            {t("common.hero.stats.gas")}:{" "}
            <span className="text-2m">{gasFees}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
