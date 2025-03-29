interface Category {
	name: string;
	src: string;
	href: string;
}

export const categories: Category[] = [
	{
		name: "Electronics",
		href: "/categories/electronics",
		src: "images/categories/cable.svg",
	},
	{
		name: "Fashion",
		href: "/categories/fashion",
		src: "images/categories/shirt.svg",
	},
	{
		name: "Home & Garden",
		href: "/categories/home-garden",
		src: "images/categories/house-plus.svg",
	},
	{
		name: "Sports",
		href: "/categories/sports",
		src: "images/categories/bike.svg",
	},
	{
		name: "Beauty",
		href: "/categories/beauty",
		src: "images/categories/palette.svg",
	},
	{
		name: "Toys",
		href: "/categories/toys",
		src: "images/categories/puzzle.svg",
	},
];

export interface CategoryCard {
	id: string;
	name: string;
	title: string;
	description?: string;
	href: string;
	badge: {
		text: string;
		icon?: string;
	};
	gradient: {
		from: string;
		to: string;
		opacity?: number;
	};
	action: {
		text: string;
	};
	featured?: boolean;
	highlightColor?: string;
	image?: string;
}

export const categoryCards: CategoryCard[] = [
	{
		id: "performance-elite",
		name: "performance",
		title: "Performance Elite",
		description: "performanceDescription",
		href: "/collections/performance",
		badge: {
			text: "newCollection",
			icon: "✧",
		},
		gradient: {
			from: "emerald-600",
			to: "emerald-900",
			opacity: 95,
		},
		action: {
			text: "exploreCollection",
		},
		featured: true,
		highlightColor: "emerald-300",
		image: "/images/products/wireless-earbuds.jpg",
	},
	{
		id: "new-arrivals",
		name: "newArrivalsTitle",
		title: "Nuevos Arribos",
		href: "/collections/new-arrivals",
		badge: {
			text: "newArrivals",
		},
		gradient: {
			from: "rose-400",
			to: "orange-500",
			opacity: 90,
		},
		action: {
			text: "discover",
		},
		image: "/images/products/wireless-earbuds.jpg",
	},
	{
		id: "casual",
		name: "casual",
		title: "Casual",
		href: "/collections/casual",
		badge: {
			text: "dailyStyle",
			icon: "👕",
		},
		gradient: {
			from: "gray-600",
			to: "gray-900",
			opacity: 85,
		},
		action: {
			text: "viewProducts",
		},
		image: "/images/products/wireless-earbuds.jpg",
	},
	{
		id: "athletes",
		name: "athletes",
		title: "Athletes",
		href: "/collections/athletes",
		badge: {
			text: "performance",
			icon: "🏆",
		},
		gradient: {
			from: "blue-500",
			to: "blue-900",
			opacity: 90,
		},
		action: {
			text: "discover",
		},
		image: "/images/products/wireless-earbuds.jpg",
	},
	{
		id: "essentials",
		name: "essentials",
		title: "Essentials",
		href: "/collections/essentials",
		badge: {
			text: "basics",
			icon: "🏆",
		},
		gradient: {
			from: "gray-500",
			to: "gray-900",
			opacity: 90,
		},
		action: {
			text: "viewCollection",
		},
		image: "/images/products/wireless-earbuds.jpg",
	},
];
