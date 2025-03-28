import {
	CategorySales,
	SalesAnalytics,
	SalesByDay,
	TimeRange,
} from "@/components/seller/mock/sales-analytics.mock";
import { CategoryChart } from "./CategoryChart";
import { SalesChart } from "./SalesChart";
import { StatsCards } from "./StatsCards";

interface SalesTabContentProps {
	range: TimeRange;
	data: SalesAnalytics;
}

export function SalesTabContent({ range, data }: SalesTabContentProps) {
	return (
		<div className="space-y-4">
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
				<StatsCards data={data} />
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
				<SalesChart data={data.salesByDay} timeRange={range} />
				<CategoryChart data={data.categorySales} timeRange={range} />
			</div>
		</div>
	);
}
