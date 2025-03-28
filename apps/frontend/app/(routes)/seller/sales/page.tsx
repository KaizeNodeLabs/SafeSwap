import { SalesHeader } from "@/components/seller/ui/pages/SalesHeader";
import { SalesTable } from "@/components/seller/ui/pages/SalesTable";
import { SalesAnalytics } from "@/components/seller/ui/pages/analytics/SalesAnalytics";
import { SalesAnalyticsHeader } from "@/components/seller/ui/pages/analytics/SalesAnalyticsHeader";

export default function SalesPage() {
	return (
		<div className="container space-y-8 py-8">
			<SalesAnalyticsHeader />
			<SalesAnalytics />
			<SalesHeader />
			<SalesTable />
		</div>
	);
}
