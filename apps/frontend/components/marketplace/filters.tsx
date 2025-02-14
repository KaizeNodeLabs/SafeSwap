import { Filter } from "lucide-react";
import { useEffect, useState } from "react";

import { FilterState } from "@/lib/types/filters";
import { Button } from "../ui/button";
import { FilterControls } from "./filters-controls";
import { FilterSheet } from "./filters-sheet";

const initialFilters: FilterState = {
	categories: [],
	priceRanges: [],
};

interface FiltersProps {
	onFiltersChange: (filters: FilterState) => void;
}

export const Filters = ({ onFiltersChange }: FiltersProps) => {
	const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState<FilterState>(initialFilters);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768 && isFilterSheetOpen) {
				setIsFilterSheetOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isFilterSheetOpen]);

	const handleApplyFilters = () => {
		onFiltersChange(filters);
		setIsFilterSheetOpen(false);
	};

	const handleResetFilters = () => {
		setFilters(initialFilters);
		onFiltersChange(initialFilters);
	};

	const handleFiltersChange = (newFilters: FilterState) => {
		setFilters(newFilters);
	};

	return (
		<>
			{/* Mobile Filter Button */}
			<div className="flex justify-end">
				<Button
					variant="outline"
					size="icon"
					className="sm:hidden"
					onClick={() => setIsFilterSheetOpen(!isFilterSheetOpen)}
				>
					<Filter />
				</Button>
			</div>

			{/* Desktop Filters */}
			<aside className="hidden sm:block w-80 space-y-6">
				<FilterControls
					filters={filters}
					onFiltersChange={handleFiltersChange}
					onApply={handleApplyFilters}
					onReset={handleResetFilters}
				/>
			</aside>

			{/* Mobile Filters Sheet */}
			<FilterSheet
				open={isFilterSheetOpen}
				onOpenChange={setIsFilterSheetOpen}
				filters={filters}
				onFiltersChange={handleFiltersChange}
				onApply={handleApplyFilters}
				onReset={handleResetFilters}
			/>
		</>
	);
};
