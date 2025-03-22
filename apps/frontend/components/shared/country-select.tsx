"use client";

import { Country, countries } from "@/lib/constants/countries";
import { ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface CountrySelectProps {
	selected: Country;
	setSelected: Dispatch<SetStateAction<Country>>;
}

export default function CountrySelect({
	selected,
	setSelected,
}: CountrySelectProps) {
	const [open, setOpen] = useState(false);
	const t = useTranslations();

	const handleSelect = (country: { name: string }) => {
		setSelected(country);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-haspopup="listbox"
					className="w-full justify-between"
					aria-expanded={open}
					onClick={() => setOpen(!open)}
				>
					{selected ? selected.name : t("common.createProduct.formCate")}
					<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-52 p-0">
				<Command>
					<CommandInput placeholder={t("common.createProduct.formNoption")} />
					<CommandList>
						<CommandEmpty>{t("common.createProduct.formNoption")}</CommandEmpty>
						<CommandGroup>
							{countries.map((country) => (
								<CommandItem
									key={country.name}
									onSelect={() => handleSelect(country)}
								>
									{country.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
