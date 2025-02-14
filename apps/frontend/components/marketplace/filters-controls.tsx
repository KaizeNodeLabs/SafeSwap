"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { FilterState } from "@/lib/types/filters";
import { cn } from "@/lib/utils";

const categories = [
	"Electronics",
	"Furniture",
	"Appliances",
	"Sports",
	"Fashion",
	"Books",
	"Toys",
	"Art",
	"Home & Garden",
	"Automotive",
];

const priceRanges = [
	{ label: "$0 - $50", min: 0, max: 50 },
	{ label: "$50 - $100", min: 50, max: 100 },
	{ label: "$100 - $200", min: 100, max: 200 },
	{ label: "$200 - $500", min: 200, max: 500 },
	{ label: "$500+", min: 500, max: Number.POSITIVE_INFINITY },
];

interface FilterControlsProps {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	onApply: () => void;
	onReset: () => void;
	className?: string;
}

export function FilterControls({
	filters,
	onFiltersChange,
	onApply,
	onReset,
	className,
}: FilterControlsProps) {
	const [open, setOpen] = useState(false);

	const toggleCategory = useCallback(
		(category: string) => {
			const newCategories = filters.categories.includes(category)
				? filters.categories.filter((c) => c !== category)
				: [...filters.categories, category];
			onFiltersChange({ ...filters, categories: newCategories });
		},
		[filters, onFiltersChange],
	);

	const togglePriceRange = useCallback(
		(range: { min: number; max: number }) => {
			const index = filters.priceRanges.findIndex(
				(r) => r.min === range.min && r.max === range.max,
			);
			const newRanges =
				index >= 0
					? filters.priceRanges.filter((_, i) => i !== index)
					: [...filters.priceRanges, range];
			onFiltersChange({ ...filters, priceRanges: newRanges });
		},
		[filters, onFiltersChange],
	);

	return (
		<div className={cn("space-y-6", className)}>
			<div className="space-y-4">
				<h3 className="font-semibold mb-2">Categories</h3>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							aria-haspopup="listbox"
							aria-expanded={open}
							className="w-full justify-between"
						>
							{filters.categories.length === 0
								? "Select categories..."
								: `${filters.categories.length} selected`}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-80 p-0">
						<Command>
							<CommandInput placeholder="Search categories..." />
							<CommandEmpty>No category found.</CommandEmpty>
							<CommandGroup className="max-h-64 overflow-auto">
								{categories.map((category) => (
									<CommandItem
										key={category}
										onSelect={() => toggleCategory(category)}
										className="flex items-center space-x-2"
									>
										<Checkbox
											checked={filters.categories.includes(category)}
											onCheckedChange={() => toggleCategory(category)}
										/>
										<span>{category}</span>
										{filters.categories.includes(category) && (
											<Check className="ml-auto h-4 w-4" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<div className="space-y-4">
				<h3 className="font-semibold mb-2">Price Range</h3>
				<div className="space-y-2">
					{priceRanges.map((range) => (
						<div key={range.label} className="flex items-center space-x-2">
							<Checkbox
								id={range.label}
								checked={filters.priceRanges.some(
									(r) => r.min === range.min && r.max === range.max,
								)}
								onCheckedChange={() => togglePriceRange(range)}
							/>
							<label htmlFor={range.label} className="text-sm">
								{range.label}
							</label>
						</div>
					))}
				</div>
			</div>

			<div className="flex gap-2">
				<Button variant="outline" onClick={onReset} className="flex-1">
					Reset
				</Button>
				<Button onClick={onApply} className="flex-1">
					Apply Filters
				</Button>
			</div>
		</div>
	);
}
