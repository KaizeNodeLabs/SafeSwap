"use client";

import { Checkbox, Slider } from "@radix-ui/themes";
import { useState } from "react";

import { SidebarContent, SidebarHeader } from "@/app/components/ui/sidebar";

const Filters = () => {
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	return (
		<>
			<SidebarHeader className="p-6 border-b">
				<h2 className="text-xl font-semibold">Filters</h2>
			</SidebarHeader>
			<SidebarContent className="p-6">
				<div className="space-y-8">
					<div>
						<h3 className="mb-2 text-lg font-medium">Price range</h3>
						<Slider
							min={0}
							max={1500}
							step={10}
							value={priceRange}
							onValueChange={(value) =>
								setPriceRange(value as [number, number])
							}
							className="mb-3"
						/>
						<div className="flex justify-between text-lg">
							<span>${priceRange[0]}</span>
							<span>${priceRange[1]}</span>
						</div>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-medium">Categories</h3>
						<div className="space-y-3">
							{["Electronics", "Furniture", "Appliances", "Sports"].map(
								(category) => (
									<div key={category} className="flex items-center">
										<Checkbox
											id={category}
											checked={selectedCategories.includes(category)}
											onCheckedChange={() => handleCategoryChange(category)}
										/>
										<label htmlFor={category} className="ml-3 text-lg">
											{category}
										</label>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</SidebarContent>
		</>
	);
};

export default Filters;
