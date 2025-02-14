import {
	BarChart3,
	Box,
	Gavel,
	Home,
	LayoutGrid,
	Lock,
	PlusCircle,
	Settings,
	ShoppingCart,
	Store,
	User,
} from "lucide-react";

import { SidebarItem } from "../types/sidebar";

export const mainNavItems: SidebarItem[] = [
	{ title: "Home", icon: Home, url: "/" },
	{ title: "Profile", icon: User, url: "/profile" },
	{ title: "Shopping", icon: ShoppingCart, url: "/shopping" },
	{ title: "Disputes", icon: Gavel, url: "/disputes" },
	{ title: "Settings", icon: Settings, url: "/settings" },
];

export const exploreNavItems: SidebarItem[] = [
	{ title: "Marketplace", icon: ShoppingCart, url: "/marketplace" },
	{ title: "Categories", icon: LayoutGrid, url: "/categories" },
];

export const sellerNavItems: SidebarItem[] = [
	{ title: "Become a Seller", icon: Store, url: "/seller/onboarding" },
	{ title: "Sell a Product", icon: PlusCircle, url: "/seller/sell" },
	{ title: "Products on Sale", icon: Box, url: "/seller/products" },
	{ title: "Sales Dashboard", icon: BarChart3, url: "/seller/sales" },
	{ title: "Escrow Processes", icon: Lock, url: "/seller/escrows" },
];
