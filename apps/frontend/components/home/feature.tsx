"use client";

import { BarChart3, Coins, Lock, Shield, Users, Zap } from "lucide-react";

import { useTranslations } from "next-intl";

export function Feature() {
	const t = useTranslations();

	const features = [
		{
			icon: <Shield className="h-8 w-8" />,
			title: t("common.features.items.smartContract.title"),
			description: (
				<>
					{t("common.features.items.smartContract.description")}{" "}
					<a
						href="https://www.trustlesswork.com/"
						target="_blank"
						className="text-blue-500 hover:underline"
						rel="noreferrer"
					>
						{t("common.features.items.smartContract.link")}
					</a>
				</>
			),
			gradient: "from-blue-500 to-cyan-500",
		},
		{
			icon: <Zap className="h-8 w-8" />,
			title: t("common.features.items.lightning.title"),
			description: t("common.features.items.lightning.description"),
			gradient: "from-yellow-500 to-orange-500",
		},
		{
			icon: <Lock className="h-8 w-8" />,
			title: t("common.features.items.nonCustodial.title"),
			description: t("common.features.items.nonCustodial.description"),
			gradient: "from-purple-500 to-pink-500",
		},
		{
			icon: <Coins className="h-8 w-8" />,
			title: t("common.features.items.multiAsset.title"),
			description: t("common.features.items.multiAsset.description"),
			gradient: "from-green-500 to-emerald-500",
		},
		{
			icon: <Users className="h-8 w-8" />,
			title: t("common.features.items.dao.title"),
			description: t("common.features.items.dao.description"),
			gradient: "from-red-500 to-pink-500",
		},
		{
			icon: <BarChart3 className="h-8 w-8" />,
			title: t("common.features.items.analytics.title"),
			description: t("common.features.items.analytics.description"),
			gradient: "from-indigo-500 to-purple-500",
		},
	];

	return (
		<div className="relative bg-black/5 dark:bg-white/5 py-24">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-4">
					{t("common.features.title")}
				</h2>
				<p className="text-center text-muted-foreground mb-16 max-w-[600px] mx-auto">
					{t("common.features.subtitle")}
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group relative p-6 rounded-xl bg-card hover:bg-card/50 transition-all duration-300"
						>
							<div
								className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${feature.gradient} rounded-xl transition-opacity duration-300`}
							/>
							<div className="relative">
								<div
									className={`mb-4 bg-gradient-to-br ${feature.gradient} text-white p-3 rounded-lg inline-block`}
								>
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
