"use client";

import { List, Settings, User, Moon, Sun, Globe, Receipt } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "@/app/components/ui/dropdown-menu";
import { Switch } from "@/app/components/ui/switch";

export const UserMenu = () => {
	const { theme, setTheme } = useTheme(); // Handles the light/dark mode logic
	const isDarkMode = theme === "dark"; // Check current theme
	const [language, setLanguage] = useState("EN");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<User className="!h-6 !w-6 transition-transform group-hover:scale-110" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64">
				{/* Profile Options */}
				<DropdownMenuItem>
					<User className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<List className="mr-2 h-4 w-4" />
					<span>My Products</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Receipt className="mr-2 h-4 w-4" />
					<span>Transactions</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
				</DropdownMenuItem>

				{/* Divider Line */}
				<div className="my-2 h-px bg-gray-200" />

				{/* Dark Mode Toggle */}
				<DropdownMenuItem asChild>
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center">
							{isDarkMode ? (
								<Moon className="mr-2 h-4 w-4" />
							) : (
								<Sun className="mr-2 h-4 w-4" />
							)}
							<span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
						</div>
						<Switch
							checked={isDarkMode}
							onCheckedChange={(checked) =>
								setTheme(checked ? "dark" : "light")
							}
							className="ml-2"
						/>
					</div>
				</DropdownMenuItem>

				{/* Language Dropdown */}
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<div className="flex items-center justify-between w-full cursor-pointer">
							<div className="flex items-center">
								<Globe className="mr-2 h-4 w-4" />
								<span>Language</span>
							</div>
							<div className="flex items-center">
								<img
									src={
										language === "EN"
											? "/images/en-flag.svg"
											: "/images/es-flag.svg"
									}
									alt={language}
									className="mr-1 h-4 w-4"
								/>
								<span>{language}</span>
							</div>
						</div>
					</DropdownMenuSubTrigger>
					{/* <DropdownMenuSubContent className="w-full mt-6 origin-top"> */}
					{/* <DropdownMenuSubContent className="absolute mt-2 left-100 top-full w-full origin-top"> */}

					<DropdownMenuSubContent
  						className="w-full mt-6 left-0 top-0 transform translate-x-[240px] translate-y-[5px] min-w-max z-50">
					{/* <DropdownMenuSubContent className="mt-2 w-full origin-top"> */}
					



						<DropdownMenuItem onClick={() => setLanguage("EN")}>
							<div className="flex items-center">
								<img
									src="/images/en-flag.svg"
									alt="English"
									className="mr-2 h-4 w-4"
								/>
								<span>EN</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setLanguage("ES")}>
							<div className="flex items-center">
								<img
									src="/images/es-flag.svg"
									alt="Español"
									className="mr-2 h-4 w-4"
								/>
								<span>ES</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
