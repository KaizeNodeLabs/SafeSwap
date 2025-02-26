"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronRight, Globe, Rocket, Shield } from "lucide-react";

import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "../ui/button";

const AdvantagesSection = () => {
	const { t } = useTranslations();

	const advantages = [
		{
			icon: <Shield className="h-8 w-8" />,
			title: t("advantagesOfSafeSwap.items.trustlessWork.title"),
			description: t("advantagesOfSafeSwap.items.trustlessWork.description"),
			gradient: "from-blue-500 to-cyan-500",
			button: (
				<Button
					variant="outline"
					className="flex justify-between items-center capitalize font-medium"
					onClick={() =>
						window.open(
							`${t("advantagesOfSafeSwap.items.trustlessWork.link")}`,
							"_blank",
						)
					}
				>
					<span>
						{t("advantagesOfSafeSwap.items.trustlessWork.buttonName")}
					</span>
					<ChevronRight className="h-8 w-8" />
				</Button>
			),
		},
		{
			icon: <Rocket className="h-8 w-8" />,
			title: t("advantagesOfSafeSwap.items.introToStellar.title"),
			description: t("advantagesOfSafeSwap.items.introToStellar.description"),
			gradient: "from-yellow-500 to-orange-500",
			button: (
				<Button
					variant="outline"
					className="flex justify-between items-center capitalize font-medium"
					onClick={() =>
						window.open(
							`${t("advantagesOfSafeSwap.items.introToStellar.link")}`,
							"_blank",
						)
					}
				>
					<span>
						{t("advantagesOfSafeSwap.items.introToStellar.buttonName")}
					</span>
					<ChevronRight className="h-8 w-8" />
				</Button>
			),
		},
		{
			icon: <Globe className="h-8 w-8" />,
			title: t("advantagesOfSafeSwap.items.powerOfStellar.title"),
			description: t("advantagesOfSafeSwap.items.powerOfStellar.description"),
			gradient: "from-purple-500 to-pink-500",
			button: (
				<Button
					variant="outline"
					className="flex justify-between items-center capitalize font-medium"
					onClick={() =>
						window.open(
							`${t("advantagesOfSafeSwap.items.powerOfStellar.link")}`,
							"_blank",
						)
					}
				>
					<span>
						{t("advantagesOfSafeSwap.items.powerOfStellar.buttonName")}
					</span>
					<ChevronRight className="h-8 w-8" />
				</Button>
			),
		},
	];

	return (
		<div className="relative bg-black/5 dark:bg-white/5 py-24 border-none">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-4">
					{t("advantagesOfSafeSwap.title")}
				</h2>
				<p className="text-center text-muted-foreground mb-16 max-w-[600px] mx-auto">
					{t("advantagesOfSafeSwap.subtitle")}
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{advantages.map((advantage) => (
						<Card
							key={advantage.title}
							className="group relative p-6 rounded-xl bg-card hover:bg-card/50 transition-all duration-300"
						>
							<div
								className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${advantage.gradient} rounded-xl transition-opacity duration-300`}
							/>
							<div className="relative flex flex-col gap-3 items-center h-full">
								<div className="flex justify-center p-2">{advantage.icon}</div>
								<CardTitle className="text-xl font-semibold mb-2 text-center">
									{advantage.title}
								</CardTitle>
								<CardContent className="text-muted-foreground text-center">
									{advantage.description}
								</CardContent>
								<div className="mt-auto">{advantage?.button}</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdvantagesSection;
