"use client";

import { useTranslations } from "@/app/hooks/useTranslations";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";

interface FiltersProps {
	priceRange: [number, number];
	setPriceRange: (value: [number, number]) => void;
	selectedCategories: string[];
	setSelectedCategories: (
		value: string[] | ((prev: string[]) => string[]),
	) => void;
}

const categories = ["electronics", "furniture", "appliances", "sports"];

const Filters: React.FC<FiltersProps> = ({
	priceRange,
	setPriceRange,
	selectedCategories,
	setSelectedCategories,
}) => {
	const { t } = useTranslations();

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	return (
		<>
			<h2 className="text-xl font-semibold mb-4">
				{t("common.filters.title")}
			</h2>
			<div className="space-y-8">
				<div>
					<h3 className="text-lg font-medium">
						{t("common.filters.priceRange")}
					</h3>
					<Slider
						min={0}
						max={1500}
						step={10}
						value={priceRange}
						onValueChange={setPriceRange}
					/>
					<div className="flex justify-between mt-2">
						<span>${priceRange[0]}</span>
						<span>${priceRange[1]}</span>
					</div>
				</div>

				<div>
					<h3 className="text-lg font-medium">
						{t("common.filters.categories.title")}
					</h3>
					{categories.map((category) => (
						<div key={category} className="flex items-center space-x-3">
							<Checkbox
								id={category}
								checked={selectedCategories.includes(category)}
								onCheckedChange={() => handleCategoryChange(category)}
							/>
							<label htmlFor={category} className="text-sm cursor-pointer">
								{t(`common.filters.categories.${category}`)}
							</label>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Filters;
