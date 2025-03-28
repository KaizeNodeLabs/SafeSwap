import { BarChart } from "lucide-react";
import { useTranslations } from "next-intl";

export function SalesAnalyticsHeader() {
	const t = useTranslations();
	return (
		<div className="flex items-center gap-2 sm:mb-0">
			<BarChart className="h-5 w-5" />
			<h1 className="text-lg font-semibold">{t("Sales.analytics.overview")}</h1>
		</div>
	);
}
