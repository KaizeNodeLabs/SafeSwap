"use client";

import {
	Globe,
	List,
	Moon,
	Receipt,
	Settings,
	User,
	UserCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Switch } from "@/app/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { LanguageSelector } from "./language-selector";

export const UserMenu = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span>
					<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<User className="!h-6 !w-6 transition-transform group-hover:scale-110" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							{/* Profile Options */}
							<DropdownMenuItem>
								<UserCircle className="mr-2 h-4 w-4" />
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
							<DropdownMenuSeparator />

							{/* Dark Mode Toggle */}
							<DropdownMenuItem onSelect={(event) => event.preventDefault()}>
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-2">
										<Moon className="mr-2 h-4 w-4" />
										<span>Dark mode</span>
									</div>
									<Switch
										checked={mounted && theme === "dark"}
										onCheckedChange={(checked) =>
											setTheme(checked ? "dark" : "light")
										}
									/>
								</div>
							</DropdownMenuItem>

							{/* Language Selector */}
							<DropdownMenuItem>
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-2">
										<Globe className="mr-2 h-4 w-4" />
										<span>Language</span>
									</div>
									<LanguageSelector />
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</span>
			</TooltipTrigger>
			{!isOpen && (
				<TooltipContent>
					<p>User Menu</p>
				</TooltipContent>
			)}
		</Tooltip>
	);
};
