"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
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
	const [opened, setOpened] = useState(false);

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
		setOpened(false);
	};

	const handleResetFilters = () => {
		setSelectedCategories([]);
		setSelectedPriceRanges([]);
		onApplyFilters({ categories: [], priceRanges: [] });
		setOpened(false);
	};

	const filteredCategories = productCategories.filter((category) =>
		category.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const buttonStyle = "w-full md:w-[48%] text-lg h-10";

	return (
		<main className="max-h-screen md:h-auto">
			<div className="space-y-6 w-[300px] hidden md:flex md:flex-col">
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

			<button
				type="button"
				className="fixed right-10 bg-[#ffffff9d] hover:bg-[#fff] shadow-md justify-between rounded-full text-black pr-3 p-[6px] pl-4 flex gap-x-3 top-20 font-medium items-center text-lg md:hidden"
				onClick={() => setOpened(!opened)}
			>
				Select filter
				<span className="p-1 rounded-full bg-black text-white flex justify-center items-center">
					<Filter />
				</span>
			</button>

			{opened && (
				<div className="gap-y-6 w-[97%] h-[60%] py-10 p-5 rounded-t-3xl flex flex-col justify-between fixed bottom-0 left-0 bg-[#e7e7e7b6] backdrop-blur-xl text-black z-50 md:hidden">
					{/* Categories Filter */}
					<div className="w-full">
						<h3 className="font-semibold mb-2 text-xl pb-2">Categories</h3>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-between bg-[#99999960]"
								>
									{selectedCategories.length > 0
										? `${selectedCategories.length} selected`
										: "Select categories..."}
									<ChevronsUpDown className="h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="max-w-[400px] min-w-[330px] p-0">
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
									<label htmlFor={priceRange} className="text-lg">
										{priceRange}
									</label>
								</div>
							))}
						</div>
					</div>

					{/* Buttons */}
					<div className="flex flex-col items-center gap-2 w-full justify-between">
						<Button
							variant="outline"
							onClick={handleResetFilters}
							className={`${buttonStyle} bg-foreground text-background`}
						>
							Reset
						</Button>
						<Button
							onClick={handleApplyFilters}
							className={`${buttonStyle} bg-background text-foreground`}
						>
							Apply Filters
						</Button>
					</div>
				</div>
			)}
		</main>
	);
};

export default ProductFilter;
