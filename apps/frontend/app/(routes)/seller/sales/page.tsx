import { SalesHeader } from "@/components/seller/ui/pages/SalesHeader";
import { SalesTable } from "@/components/seller/ui/pages/SalesTable";
import { SalesAnalytics } from "@/components/seller/ui/pages/analytics/SalesAnalytics";
import { SalesAnalyticsHeader } from "@/components/seller/ui/pages/analytics/SalesAnalyticsHeader";

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
