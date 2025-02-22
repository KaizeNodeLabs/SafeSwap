import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterState {
	sortBy: string;
	minPrice: string;
	maxPrice: string;
	dateListed: string;
	deliveryMethod: string;
	condition: string[];
}

type FilterModalProps = {};

export default function FilterModal({}: FilterModalProps) {
	const [filters, setFilters] = useState<FilterState>({
		sortBy: "",
		minPrice: "",
		maxPrice: "",
		dateListed: "",
		deliveryMethod: "",
		condition: [],
	});

	const toggleCondition = (condition: string) => {
		setFilters((prev) => {
			const conditions = prev.condition.includes(condition)
				? prev.condition.filter((c) => c !== condition)
				: [...prev.condition, condition];
			return { ...prev, condition: conditions };
		});
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md">
						<Filter size={18} />
						<span className="font-medium">Filters</span>
					</button>
				</DialogTrigger>
				<DialogContent className="max-w-md">
					<div className="flex justify-between items-center">
						<DialogHeader>
							<DialogTitle>Filters</DialogTitle>
						</DialogHeader>
					</div>

					<Select
						onValueChange={(value: any) =>
							setFilters({ ...filters, sortBy: value })
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="suggested">Suggested</SelectItem>
							<SelectItem value="distance">Distance: Nearest first</SelectItem>
							<SelectItem value="date-listed">
								Date listed: Newest first
							</SelectItem>
							<SelectItem value="price">Price: Highest first</SelectItem>
							<SelectItem value="price-low">Price: Lowest first</SelectItem>
						</SelectContent>
					</Select>

					<div className="flex gap-2">
						<Input
							placeholder="Min price"
							value={filters.minPrice}
							onChange={(e) =>
								setFilters({ ...filters, minPrice: e.target.value })
							}
						/>
						<Input
							placeholder="Max price"
							value={filters.maxPrice}
							onChange={(e) =>
								setFilters({ ...filters, maxPrice: e.target.value })
							}
						/>
					</div>

					<Select
						onValueChange={(value: any) =>
							setFilters({ ...filters, dateListed: value })
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Date Listed" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="last 24 hours">Last 24 hours </SelectItem>
							<SelectItem value="last 7 days">Last 7 days</SelectItem>
							<SelectItem value="last 30 days">Last 30 days</SelectItem>
						</SelectContent>
					</Select>

					<Select
						onValueChange={(value: any) =>
							setFilters({ ...filters, deliveryMethod: value })
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Delivery Method" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="local pickup">Local Pickup</SelectItem>
							<SelectItem value="delivery">Shipping</SelectItem>
						</SelectContent>
					</Select>

					<div>
						<p className="font-medium">Condition</p>
						{["New", "Like New", "Good", "Fair"].map((condition) => (
							<div key={condition} className="flex items-center gap-2">
								<Checkbox
									id={condition}
									checked={filters.condition.includes(condition)}
									onCheckedChange={() => toggleCondition(condition)}
								/>
								<label htmlFor={condition}>{condition}</label>
							</div>
						))}
					</div>

					<div className="flex justify-between">
						<Button
							variant="outline"
							onClick={() =>
								setFilters({
									sortBy: "",
									minPrice: "",
									maxPrice: "",
									dateListed: "",
									deliveryMethod: "",
									condition: [],
								})
							}
						>
							Reset
						</Button>
						<Button>Apply Filters</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
