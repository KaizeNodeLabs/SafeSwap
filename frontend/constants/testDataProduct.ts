import { Product } from "@/entities/Product";

export const products: Product[] = [
	{
		id: 1,
		name: "MacBook Pro 14",
		price: 1299,
		category: "Electronics",
		description: "The new MacBook Pro 14-inch with the M1 Pro chip.",
		images: [
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
		],
		starts: 4.5,
	},
	{
		id: 2,
		name: "Samsung Galaxy S24 FE",
		price: 699,
		category: "Electronics",
		description: "The new Samsung Galaxy S24 FE with 5G support.",
		images: [
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
		],
		starts: 4,
	},
	{
		id: 3,
		name: "Ergonomic Chair",
		price: 299,
		category: "Furniture",
		description: "Ergonomic chair for your home office.",
		images: [
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
		],
		starts: 2,
	},
	{
		id: 4,
		name: "Coffee Maker",
		price: 89,
		category: "Appliances",
		description: "Coffee maker with built-in grinder.",
		images: [
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
		],
		starts: 1,
	},
	{
		id: 5,
		name: "Running Shoes",
		price: 129,
		category: "Sports",
		description: "Running shoes for your daily workout.",
		images: [
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
		],
		starts: 5,
	},
	{
		id: 6,
		name: "Wireless Earbuds",
		price: 159,
		category: "Electronics",
		description: "Wireless earbuds with active noise cancellation.",
		images: [
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
		],
		starts: 3,
	},
];
