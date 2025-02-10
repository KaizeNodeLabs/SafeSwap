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
	return <div className="space-y-6 w-[300px]"></div>;
};

export default ProductFilter;
