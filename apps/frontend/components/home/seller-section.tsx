"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";
export function SellerSection() {
	const { t } = useTranslations();

	return (
		<div className="relative flex flex-col px-4 justify-center items-center bg-black/5 dark:bg-white/5  py-10 overflow-hidden">
			<h2 className="text-3xl capitalize font-bold text-center mb-4">
				{t("common.seller.title")}
			</h2>
			<p className="text-center text-muted-foreground mb-5 max-w-[600px] mx-auto">
				{t("common.seller.description")}
			</p>
			<div className="relative max-w-6xl mx-auto px-4">
				<Link href="/seller/onboarding">
					<Button size="lg" className="group">
						{t("common.seller.btn_label")}
					</Button>
				</Link>
			</div>
		</div>
	);
}
