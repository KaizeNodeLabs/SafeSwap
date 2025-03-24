"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Dumbbell,
	Heart,
	Home,
	Search,
	Shirt,
	Smartphone,
	ToyBrick,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

// Mock data
const categories = [
	{ id: 1, name: "Electronics", tag: "TECH ESSENTIALS", icon: Smartphone },
	{ id: 2, name: "Fashion", tag: "DAILY STYLE", icon: Shirt },
	{ id: 3, name: "Home & Garden", tag: "INTERIOR DESIGN", icon: Home },
	{ id: 4, name: "Sports", tag: "ACTIVE LIFE", icon: Dumbbell },
	{ id: 5, name: "Beauty", tag: "SELF CARE", icon: Heart },
	{ id: 6, name: "Toys", tag: "PLAY TIME", icon: ToyBrick },
];

export function Categories() {
	const t = useTranslations("categories");
	const [searchTerm, setSearchTerm] = useState("");

	// Filter categories based on search term
	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const backgroundCategoryImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' opacity='0.1'%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23FFFFFF' stroke-width='20'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23FFFFFF' stroke-width='10'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%23FFFFFF' stroke-width='5'/%3E%3C/svg%3E")
  `;

	return (
		<div className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
			<div className="text-center">
				<h2 className="text-4xl font-bold mb-3 tracking-tight">{t("title")}</h2>
				<p className="text-gray-500 text-base max-w-2xl mx-auto">
					{t("description")}
				</p>
			</div>

			<div className="relative mb-12 max-w-lg mx-auto top-4">
				<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
				<Input
					type="text"
					placeholder={t("searchPlaceholder")}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-12 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredCategories.length > 0 ? (
					filteredCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Card
								key={category.id}
								className="relative hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden p-6 flex flex-col"
								style={{
									backgroundImage: backgroundCategoryImage,
									backgroundColor: "#808080",
									backgroundSize: "cover",
									backgroundPosition: "center",
									color: "white",
									height: "200px",
								}}
							>
								<div className="flex flex-col mt-[50px]">
									<div className="top-1 left-4 right-4 gap-3 mb-2">
										<Badge
											variant="secondary"
											className="flex items-center gap-1 bg-white text-gray-800 text-xs font-small py-0.5 px-4 rounded-full w-fit transition-colors duration-200 hover:bg-gray-200 hover:text-black"
										>
											{category.tag}
										</Badge>
									</div>
									<div className="flex items-center gap-3 mb-4">
										<IconComponent className="h-6 w-6" />
										<span className="text-xl font-semibold">
											{category.name}
										</span>
									</div>
									<a
										href={`/categories/${category.name.toLowerCase()}`}
										className="text-white hover:underline text-sm flex items-center"
									>
										{t("viewProducts")} →
									</a>
								</div>
							</Card>
						);
					})
				) : (
					<p className="col-span-full text-center text-gray-500">
						{t("noResults")}
					</p>
				)}
			</div>
		</div>
	);
}
