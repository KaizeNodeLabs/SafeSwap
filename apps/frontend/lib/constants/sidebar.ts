import {
	BarChart3,
	Box,
	Gavel,
	Home,
	LayoutGrid,
	Lock,
	MessageSquare,
	PlusCircle,
	Settings,
	ShoppingCart,
	Store,
	User,
} from "lucide-react";

import { SidebarItem } from "../types/sidebar";

export const mainNavItems: SidebarItem[] = [
	{ translationKey: "home", title: "Home", icon: Home, url: "/" },
	{ translationKey: "profile", title: "Profile", icon: User, url: "/profile" },
	{
		translationKey: "shopping",
		title: "Shopping",
		icon: ShoppingCart,
		url: "/shopping",
	},
	{
		translationKey: "settings",
		title: "Settings",
		icon: Settings,
		url: "/settings",
	},
];

export const exploreNavItems: SidebarItem[] = [
	{
		translationKey: "marketplace",
		title: "Marketplace",
		icon: ShoppingCart,
		url: "/marketplace",
	},
	{
		translationKey: "categories",
		title: "Categories",
		icon: LayoutGrid,
		url: "/categories",
	},
];

export const sellerNavItems: SidebarItem[] = [
	{
		translationKey: "becomeASeller",
		title: "Become a Seller",
		icon: Store,
		url: "/seller/onboarding",
	},
	{
		translationKey: "sellAProduct",
		title: "Sell a Product",
		icon: PlusCircle,
		url: "/seller/sell",
	},
	{
		translationKey: "productsOnSale",
		title: "Products on Sale",
		icon: Box,
		url: "/seller/products",
	},
	{
		translationKey: "salesDashboard",
		title: "Sales Dashboard",
		icon: BarChart3,
		url: "/seller/sales",
	},
];
