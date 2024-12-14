"use client";

import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { SafeSwapLogo } from "@/app/components/ui/SafeSwapLogo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { Search, ShoppingCart, Wallet } from "lucide-react";
import { IoMoon, IoSunny } from "react-icons/io5";

interface HeaderProps {
	searchTerm?: string;
	setSearchTerm?: Dispatch<SetStateAction<string>>;
}

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			setDark(JSON.parse(darkMode));
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			document.documentElement.classList.toggle("dark", dark);
			localStorage.setItem("darkMode", JSON.stringify(dark));
		}
	}, [dark]);

	const showSearchBar = searchTerm !== undefined && setSearchTerm !== undefined;

	return (
		<header className="flex items-center justify-between px-6 py-4 border-b">
			<div className="flex items-center gap-4 min-w-max">
				<Link href={"/"}>
					<SafeSwapLogo width={150} height={40} />
				</Link>
			</div>
			{showSearchBar ? (
				<div className="relative w-full pl-2 max-w-[18.75rem] md:w-[18.75rem]">
					<Input
						type="search"
						placeholder="Search products..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full h-8 pr-10"
					/>
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-0 top-0 h-full"
					>
						<Search className="h-5 w-5" />
						<span className="sr-only">Search</span>
					</Button>
				</div>
			) : null}
			<div className="flex gap-4">
				<Button size="lg" className="group">
					<Wallet className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
					Connect Wallet
				</Button>
				<Button className="group h-auto">
					<ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
				</Button>
				<button
					onClick={() => setDark(!dark)}
					className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
					aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
				>
					{dark ? (
						<IoSunny className="w-6 h-6" />
					) : (
						<IoMoon className="w-6 h-6" />
					)}
				</button>
			</div>
		</header>
	);
}
