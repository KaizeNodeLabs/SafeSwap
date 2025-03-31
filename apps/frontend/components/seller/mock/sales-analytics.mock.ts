export type TimeRange = "Monthly" | "Quarterly" | "Yearly" | "All Time";

export interface SalesByDay {
	date: string;
	sales: number;
}

export interface CategorySales {
	name: string;
	value: number;
	color: string;
}

export interface SalesAnalytics {
	totalSales: number;
	averageOrderValue: number;
	totalOrders: number;
	salesByDay: SalesByDay[];
	categorySales: CategorySales[];
}

export const mockSalesData: Record<TimeRange, SalesAnalytics> = {
	Monthly: {
		totalSales: 10543,
		averageOrderValue: 351,
		totalOrders: 968,
		salesByDay: Array.from({ length: 30 }, (_, i) => ({
			date: `2024-03-${String(i + 1).padStart(2, "0")}`,
			sales: Math.floor(Math.random() * 450) + 150,
		})),
		categorySales: [
			{ name: "Electronics", value: 42, color: "green" },
			{ name: "Clothing", value: 14, color: "orange" },
			{ name: "Home", value: 25, color: "gray" },
			{ name: "Other", value: 19, color: "gold" },
		],
	},
	Quarterly: {
		totalSales: 35250,
		averageOrderValue: 375,
		totalOrders: 2945,
		salesByDay: Array.from({ length: 90 }, (_, i) => ({
			date: new Date(2024, 0, i + 1).toISOString().split("T")[0],
			sales: Math.floor(Math.random() * 500) + 200,
		})),
		categorySales: [
			{ name: "Electronics", value: 42, color: "green" },
			{ name: "Clothing", value: 14, color: "orange" },
			{ name: "Home", value: 25, color: "gray" },
			{ name: "Other", value: 19, color: "gold" },
		],
	},
	Yearly: {
		totalSales: 156780,
		averageOrderValue: 385,
		totalOrders: 12567,
		salesByDay: Array.from({ length: 12 }, (_, i) => ({
			date: new Date(2024, i, 1).toISOString().split("T")[0],
			sales: Math.floor(Math.random() * 15000) + 8000,
		})),
		categorySales: [
			{ name: "Electronics", value: 42, color: "green" },
			{ name: "Clothing", value: 14, color: "orange" },
			{ name: "Home", value: 25, color: "gray" },
			{ name: "Other", value: 19, color: "gold" },
		],
	},
	"All Time": {
		totalSales: 458920,
		averageOrderValue: 392,
		totalOrders: 36789,
		salesByDay: Array.from({ length: 24 }, (_, i) => ({
			date: new Date(2022 + Math.floor(i / 12), i % 12, 1)
				.toISOString()
				.split("T")[0],
			sales: Math.floor(Math.random() * 25000) + 12000,
		})),
		categorySales: [
			{ name: "Electronics", value: 42, color: "green" },
			{ name: "Clothing", value: 14, color: "orange" },
			{ name: "Home", value: 25, color: "gray" },
			{ name: "Other", value: 19, color: "gold" },
		],
	},
};
