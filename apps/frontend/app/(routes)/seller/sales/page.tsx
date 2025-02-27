import { SalesHeader } from "@/components/seller/ui/pages/SalesHeader";
import { SalesTable } from "@/components/seller/ui/pages/SalesTable";

export default function SalesPage() {
	return (
		<div className="container space-y-2">
			<SalesHeader />
			<SalesTable /> 
		</div>
	);
}
