import { SalesAnalytics } from "@/components/seller/analytics/sales-analytics";
import { SalesAnalyticsHeader } from "@/components/seller/analytics/sales-analytics-header";
import { SalesHeader } from "@/components/seller/sales-header";
import { SalesTable } from "@/components/seller/sales-table";

export default function SalesPage() {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-4 sm:py-8 max-w-[100vw] overflow-x-hidden">
			<SalesAnalyticsHeader />
			<SalesAnalytics />
			<SalesHeader />
			<SalesTable />
		</div>
	);
}
