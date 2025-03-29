"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoryCards } from "@/lib/constants/categories";

export function ExploreCategories() {
	const t = useTranslations("exploreCategories");

	const featuredCard = categoryCards.find((card) => card.featured);
	const regularCards = categoryCards.filter((card) => !card.featured);

	return (
		<section className="py-16 px-4 md:px-8 dark:bg-white/5 bg-black/5">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-between mb-10">
					<h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
					<Button
						variant="ghost"
						asChild
						className="gap-1 hover:bg-gray-100 font-medium"
					>
						<Link href="/categories">
							{t("viewAll")} <ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{featuredCard && (
						<Card className="border-0 rounded-lg shadow-lg md:row-span-2 md:col-span-1 overflow-hidden relative group transition-all duration-300 hover:shadow-xl">
							<div className="relative h-full">
								{featuredCard.image && (
									<div className="absolute inset-0 overflow-hidden">
										<Image
											src={featuredCard.image || "/placeholder.svg"}
											alt={t(featuredCard.name)}
											fill
											className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
											priority
										/>
									</div>
								)}

								<div className="absolute inset-0 gradient-performance" />

								<CardContent className="p-8 md:p-10 h-full flex flex-col justify-between relative z-10 aspect-[3/4] md:aspect-auto">
									<div>
										<Badge
											variant="outline"
											className="bg-white/20 backdrop-blur-sm text-white border-0 mb-4 py-1.5 px-3 font-medium text-sm uppercase tracking-wider"
										>
											{featuredCard.badge.icon && (
												<span className="mr-2">{featuredCard.badge.icon}</span>
											)}
											{t(featuredCard.badge.text)}
										</Badge>
										<h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
											{t(featuredCard.name)}{" "}
											<span className="text-emerald-300">Elite</span>
										</h3>
										{featuredCard.description && (
											<p className="text-white/90 mt-4 max-w-md text-lg leading-relaxed">
												{t(featuredCard.description)}
											</p>
										)}
									</div>
									<Button
										variant="outline"
										className="mt-8 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full px-6 py-2.5 font-medium transition-all duration-300 group-hover:bg-white/30"
										asChild
									>
										<Link href={featuredCard.href}>
											{t(featuredCard.action.text)}{" "}
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								</CardContent>
							</div>
						</Card>
					)}

					{regularCards.map((card) => (
						<Card
							key={card.id}
							className="border-0 rounded-lg shadow-lg overflow-hidden relative group transition-all duration-300 hover:shadow-xl"
						>
							<div className="relative h-full">
								{card.image && (
									<div className="absolute inset-0 overflow-hidden">
										<Image
											src={card.image || "/placeholder.svg"}
											alt={t(card.name)}
											fill
											className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
										/>
									</div>
								)}

								<div className={`absolute inset-0 gradient-${card.id}`} />

								<CardContent className="p-6 md:p-8 flex flex-col h-full justify-between relative z-10 aspect-square">
									<div className="mt-auto">
										<Badge
											variant="outline"
											className="bg-white/20 backdrop-blur-sm text-white border-0 mb-4 py-1 px-3 font-medium text-xs uppercase tracking-wider"
										>
											{card.badge.icon && (
												<span className="mr-1.5">{card.badge.icon}</span>
											)}
											{t(card.badge.text)}
										</Badge>
										<h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
											{t(card.name)}
										</h3>
									</div>
									<Button
										variant="link"
										className="p-0 text-white justify-start mt-4 font-medium group"
										asChild
									>
										<Link href={card.href}>
											{t(card.action.text)}{" "}
											<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								</CardContent>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
