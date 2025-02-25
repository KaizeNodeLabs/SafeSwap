import { SalesHeader } from "./SalesHeader";
import { SalesTable } from "./SalesTable";

export default function SalesPage() {
	return (
		<div className="container py-6 space-y-6">
			<SalesHeader />
			<SalesTable />
		</div>
	);
}
