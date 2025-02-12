"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { FilterState } from "@/lib/types/filters";
import { FilterControls } from "./filters-controls";

interface FilterSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	onApply: () => void;
	onReset: () => void;
}

export function FilterSheet({
	open,
	onOpenChange,
	filters,
	onFiltersChange,
	onApply,
	onReset,
}: FilterSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="bottom" className="h-[60vh] rounded-t-xl">
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
				</SheetHeader>
				<div className="mt-4">
					<FilterControls
						filters={filters}
						onFiltersChange={onFiltersChange}
						onApply={onApply}
						onReset={onReset}
						className="h-[calc(80vh-8rem)] overflow-auto pb-20"
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
}
