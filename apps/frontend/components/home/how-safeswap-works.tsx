"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/hooks/useTranslations";
import { Package, Search, ShieldCheck } from "lucide-react";

export function HowSafeSwapWorks() {
	const { t } = useTranslations();

	return (
		<section className="flex flex-col items-center py-12 px-4 md:px-8 dark:bg-white/5 bg-black/5">
			<h2 className="text-2xl font-bold mb-8 text-center">
				{t("howSafeSwapWorks.title")}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
				{/** Step 1 */}
				<Card className="text-center p-6 border-none shadow-none">
					<CardContent className="flex flex-col items-center">
						<div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary">
							<Search size={35} className="text-primary-foreground" />
						</div>
						<h3 className="text-lg font-semibold mt-4">
							{t("howSafeSwapWorks.step1.title")}
						</h3>
						<p className="text-muted-foreground mt-2">
							{t("howSafeSwapWorks.step1.description")}
						</p>
					</CardContent>
				</Card>

				{/** Step 2 */}
				<Card className="text-center p-6 border-none shadow-none">
					<CardContent className="flex flex-col items-center">
						<div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary">
							<ShieldCheck size={35} className="text-primary-foreground" />
						</div>
						<h3 className="text-lg font-semibold mt-4">
							{t("howSafeSwapWorks.step2.title")}
						</h3>
						<p className="text-muted-foreground mt-2">
							{t("howSafeSwapWorks.step2.description")}
						</p>
					</CardContent>
				</Card>

				{/** Step 3 */}
				<Card className="text-center p-6 border-none shadow-none">
					<CardContent className="flex flex-col items-center">
						<div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary">
							<Package size={35} className="text-primary-foreground" />
						</div>
						<h3 className="text-lg font-semibold mt-4">
							{t("howSafeSwapWorks.step3.title")}
						</h3>
						<p className="text-muted-foreground mt-2">
							{t("howSafeSwapWorks.step3.description")}
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
