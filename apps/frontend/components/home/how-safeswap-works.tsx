"use client";

import { Package, Search, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const steps = [
	{
		icon: <Search className="h-8 w-8" />,
		key: "step1",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		icon: <ShieldCheck className="h-8 w-8" />,
		key: "step2",
		gradient: "from-red-500 to-pink-500",
	},
	{
		icon: <Package className="h-8 w-8" />,
		key: "step3",
		gradient: "from-indigo-500 to-purple-500",
	},
];

export function HowSafeSwapWorks() {
	const t = useTranslations();

	return (
		<section className="flex flex-col items-center py-12 px-4 md:px-8 dark:bg-white/5 bg-black/5">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-3xl font-bold mb-8 text-center">
					{t("howSafeSwapWorks.title")}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{steps.map(({ icon, key, gradient }) => (
						<Card
							key={key}
							className="group relative p-6 rounded-xl bg-card hover:bg-card/50 transition-all duration-300"
						>
							<div
								className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${gradient} rounded-xl transition-opacity duration-300`}
							/>
							<div className="relative flex flex-col gap-3 items-center h-full">
								<div
									className={`bg-gradient-to-br ${gradient} text-white p-3 rounded-lg inline-block`}
								>
									{icon}
								</div>
								<CardTitle className="text-xl font-semibold mb-2 text-center">
									{t(`howSafeSwapWorks.${key}.title`)}
								</CardTitle>
								<CardContent className="text-muted-foreground text-center">
									{t(`howSafeSwapWorks.${key}.description`)}
								</CardContent>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
