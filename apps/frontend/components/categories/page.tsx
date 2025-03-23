"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Dumbbell,
	Heart,
	Home,
	Search,
	Shirt,
	Smartphone,
	Tag,
	ToyBrick,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

// Mock data for categories
const categories = [
	{ id: 1, name: "Electronics", tag: "Tech Essentials", icon: Smartphone },
	{ id: 2, name: "Fashion", tag: "Daily Style", icon: Shirt },
	{ id: 3, name: "Home & Garden", tag: "Interior Design", icon: Home },
	{ id: 4, name: "Sports", tag: "Active Life", icon: Dumbbell },
	{ id: 5, name: "Beauty", tag: "Self Care", icon: Heart },
	{ id: 6, name: "Toys", tag: "Play Time", icon: ToyBrick },
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
		<div className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
			{/* Title and Description */}
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
				<p className="text-gray-600 dark:text-gray-400">{t("description")}</p>
			</div>

			{/* Search Bar */}
			<div className="relative mb-8 max-w-md mx-auto">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
				<Input
					type="text"
					placeholder={t("searchPlaceholder")}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
			</div>

			{/* Categories Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredCategories.length > 0 ? (
					filteredCategories.map((category) => {
						const IconComponent = category.icon; // Dynamically render the icon component
						return (
							<Card
								key={category.id}
								className="hover:shadow-lg transition-shadow duration-300"
								style={{
									backgroundImage: backgroundCategoryImage,
									backgroundColor: "#6B7280", // Gray background
									backgroundSize: "cover",
									backgroundPosition: "center",
									color: "white",
								}}
							>
								<CardHeader>
									<div className="flex justify-between items-center">
										<Badge
											variant="secondary"
											className="flex items-center gap-1 bg-white text-gray-800"
										>
											<Tag className="h-4 w-4" />
											{category.tag}
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<CardTitle className="text-xl font-semibold mb-2 flex items-center gap-2">
										<IconComponent className="h-6 w-6" />
										{category.name}
									</CardTitle>
									<a
										href={`/categories/${category.name.toLowerCase()}`}
										className="text-blue-300 hover:underline"
									>
										{t("viewProducts")}
									</a>
								</CardContent>
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
