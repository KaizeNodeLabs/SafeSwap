"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/useTranslations";

export const SearchBar = () => {
	const { t } = useTranslations();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);

	useEffect(() => {
		// Add keyboard event listener for Ctrl+K and Escape
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsSearchExpanded(true);
			} else if (e.key === "Escape") {
				setIsSearchExpanded(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleSearchClose = () => {
		setIsSearchExpanded(false);
		setSearchTerm("");
	};

	// When search is expanded, add a class to the body to prevent scrolling
	useEffect(() => {
		if (isSearchExpanded) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isSearchExpanded]);

	// Collapsed search button
	if (!isSearchExpanded) {
		return (
			<Button
				variant="ghost"
				size="icon"
				className="flex items-center justify-center -mr-1"
				onClick={() => setIsSearchExpanded(true)}
				aria-label={t("common.search")}
			>
				<Search className="!h-6 !w-6 transition-transform group-hover:scale-110" />
				<span className="sr-only">{t("common.search")}</span>
			</Button>
		);
	}

	// Expanded search input
	return (
		<div className="fixed inset-0 flex items-start justify-center pt-16 px-4 bg-black/40 z-50">
			<div className="w-full max-w-md relative flex items-center bg-background border rounded-md shadow-lg">
				<Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder={
						t("common.searchPlaceholder") || "Search products, categories..."
					}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-9 pr-9 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					autoFocus
				/>
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-1 h-7 w-7"
					onClick={handleSearchClose}
				>
					<X className="h-4 w-4" />
					<span className="sr-only">{t("common.close")}</span>
				</Button>
			</div>
		</div>
	);
};
