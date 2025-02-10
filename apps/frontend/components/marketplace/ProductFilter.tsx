"use client"; // Required for client-side interactivity

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface FilterCriteria {
	categories: string[];
	priceRanges: string[];
}

interface ProductFilterProps {
	onApplyFilters: (filters: FilterCriteria) => void;
}

const productCategories = [
	"Electronics",
	"Furniture",
	"Appliances",
	"Sports",
	"Fashion",
	"Books",
	"Toys",
	"Art",
];

const productPriceRanges = [
	"$0 - $50",
	"$50 - $100",
	"$100 - $200",
	"$200 - $500",
	"$500+",
];

const ProductFilter = ({ onApplyFilters }: ProductFilterProps) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const handleCategoryToggle = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	const handlePriceRangeToggle = (priceRange: string) => {
		setSelectedPriceRanges((prev) =>
			prev.includes(priceRange)
				? prev.filter((p) => p !== priceRange)
				: [...prev, priceRange],
		);
	};

	const handleApplyFilters = () => {
		onApplyFilters({
			categories: selectedCategories,
			priceRanges: selectedPriceRanges,
		});
	};

	const handleResetFilters = () => {
		setSelectedCategories([]);
		setSelectedPriceRanges([]);
		onApplyFilters({ categories: [], priceRanges: [] });
	};

	const filteredCategories = productCategories.filter((category) =>
		category.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const buttonStyle = "w-[48%]";

	return (
		<div className="space-y-6 w-[300px]">
			{/* Categories Filter */}
			<div className="w-full">
				<h3 className="font-semibold mb-2">Categories</h3>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="w-full justify-between">
							{selectedCategories.length > 0
								? `${selectedCategories.length} selected`
								: "Select categories..."}
							<ChevronsUpDown className="h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[300px] p-0">
						<Command>
							<CommandInput
								placeholder="Search categories..."
								value={searchQuery}
								onValueChange={setSearchQuery}
							/>
							<CommandGroup className="h-[250px] overflow-y-visible">
								{filteredCategories.map((category) => (
									<CommandItem
										key={category}
										onSelect={() => handleCategoryToggle(category)}
										className="flex w-full justify-between"
									>
										{category}

										<Check
											className={`ml-2 h-4 w-4 ${
												selectedCategories.includes(category)
													? "opacity-100"
													: "opacity-0"
											}`}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Price Range Filter */}
			<div>
				<h3 className="font-semibold mb-2">Price Range</h3>
				<div className="space-y-2">
					{productPriceRanges.map((priceRange) => (
						<div key={priceRange} className="flex items-center space-x-2">
							<Checkbox
								id={priceRange}
								checked={selectedPriceRanges.includes(priceRange)}
								onCheckedChange={() => handlePriceRangeToggle(priceRange)}
							/>
							<label htmlFor={priceRange}>{priceRange}</label>
						</div>
					))}
				</div>
			</div>

			{/* Buttons */}
			<div className="flex space-x-2 w-full justify-between">
				<Button
					variant="outline"
					onClick={handleResetFilters}
					className={`${buttonStyle}`}
				>
					Reset
				</Button>
				<Button onClick={handleApplyFilters} className={`${buttonStyle}`}>
					Apply Filters
				</Button>
			</div>
		</div>
	);
};

export default ProductFilter;
