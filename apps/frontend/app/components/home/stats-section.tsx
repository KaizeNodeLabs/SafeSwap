"use client";

import { useTranslations } from "@/app/hooks/useTranslations";

export function StatsSection() {
	const { t } = useTranslations();

	const stats = [
		{
			key: "totalVolume",
			label: t("common.stats.totalVolume.label"),
			value: t("common.stats.totalVolume.value"),
			subtext: t("common.stats.totalVolume.subtext"),
			change: t("common.stats.totalVolume.change"),
		},
		{
			key: "activeTraders",
			label: t("common.stats.activeTraders.label"),
			value: t("common.stats.activeTraders.value"),
			subtext: t("common.stats.activeTraders.subtext"),
			change: t("common.stats.activeTraders.change"),
		},
		{
			key: "successfulTrades",
			label: t("common.stats.successfulTrades.label"),
			value: t("common.stats.successfulTrades.value"),
			subtext: t("common.stats.successfulTrades.subtext"),
			change: t("common.stats.successfulTrades.change"),
		},
	];

	return (
		<div className="relative py-20 overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute inset-0 bg-primary/5 transform origin-top-left" />

			<div className="relative max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{stats.map((stat) => (
						<div key={stat.key} className="relative group">
							<div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300">
								<div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
									{stat.value}
								</div>
								<div className="text-lg font-medium mb-1">{stat.label}</div>
								<div className="text-sm text-muted-foreground">
									{stat.subtext}
								</div>
								<div className="text-xs text-primary/80 mt-2">
									{stat.change}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
