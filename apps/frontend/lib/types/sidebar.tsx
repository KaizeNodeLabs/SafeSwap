import { LucideIcon } from "lucide-react";

export interface SidebarItem {
	title: string;
	icon: LucideIcon;
	url: string;
}

export type SidebarGroupKeys = "explore" | "seller";
