"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Seller() {
	const t = useTranslations();

	return (
		<div className="relative flex flex-col justify-center items-center py-12 px-4 md:px-8 dark:bg-white/5 bg-black/5 overflow-hidden">
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
