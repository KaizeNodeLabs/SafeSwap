"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SafeSwapLogo } from "@/app/components/logo/safe-swap-logo";
import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";

import DeliveryCountry from "@/app/components/marketplace/delivery-country";

import {
	History,
	List,
	Moon,
	Search,
	Settings,
	ShoppingCart,
	Sun,
	User,
	Wallet,
} from "lucide-react";

export default function Header() {
	const [searchTerm, setSearchTerm] = useState<string>("");
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
		<>
			<header className="flex items-center justify-between px-6 py-4 border-b">
				<div className="flex items-center gap-4 min-w-max">
					<Link href={"/"}>
						<SafeSwapLogo width={150} height={40} />
					</Link>
					<DeliveryCountry />
				</div>
				<div className="flex items-center gap-4">
					{showSearchBar ? (
						<div className="relative w-full pl-2 max-w-[18.75rem] md:w-[18.75rem]">
							<Input
								type="search"
								placeholder="What are you looking for?"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full h-10 pr-10"
							/>
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-0 top-0 h-full"
							>
								<Search className="!h-5 !w-5" />
								<span className="sr-only">Search</span>
							</Button>
						</div>
					) : null}
				</div>
				<div className="flex gap-1">
					<Button variant="ghost" size="icon" className="group">
						<Wallet className="!h-6 !w-6 transition-transform group-hover:scale-110" />
					</Button>
					<Button
						onClick={() => setDark(!dark)}
						variant="ghost"
						size="icon"
						className="h-auto"
						aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
					>
						{dark ? (
							<Sun className="!w-6 !h-6" />
						) : (
							<Moon className="!w-6 !h-6" />
						)}
					</Button>
					<Button variant="ghost" size="icon" className="group h-auto">
						<ShoppingCart className="!h-6 !w-6 transition-transform group-hover:scale-110" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="group h-auto">
								<User className="!h-6 !w-6 transition-transform group-hover:scale-110" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48">
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<List className="mr-2 h-4 w-4" />
								My Listings
							</DropdownMenuItem>
							<DropdownMenuItem>
								<History className="mr-2 h-4 w-4" />
								Transaction History
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</>
	);
}
