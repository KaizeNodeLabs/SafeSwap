import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesAnalytics } from "@/lib/mocks/seller/sales-analytics.mock";
import { DollarSign, Package, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatsCardsProps {
	data: Pick<
		SalesAnalytics,
		"totalSales" | "averageOrderValue" | "totalOrders"
	>;
}

export function StatsCards({ data }: StatsCardsProps) {
	const t = useTranslations();
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const numberFormatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const stats = [
		{
			title: t("Sales.analytics.stats.totalSales"),
			value: currencyFormatter.format(data.totalSales),
			icon: DollarSign,
		},
		{
			title: t("Sales.analytics.stats.averageOrder"),
			value: currencyFormatter.format(data.averageOrderValue),
			icon: TrendingUp,
		},
		{
			title: t("Sales.analytics.stats.totalOrders"),
			value: numberFormatter.format(data.totalOrders),
			icon: Package,
		},
	];

	return (
		<>
			{stats.map((stat) => (
				<Card key={stat.title} className="col-span-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<stat.icon className="h-4 w-4 text-muted-foreground m-3" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stat.value}</div>
					</CardContent>
				</Card>
			))}
		</>
	);
}
