import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import * as React from "react";

export function DeliveryLocationButton() {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a country" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Countries</SelectLabel>
				</SelectGroup>
				<SelectItem value="cr" className="flex items-center justify-between">
					Costa Rica
					<img
						src="/images/costarica.svg"
						alt="Costa Rica flag"
						className="inline-block w-6 h-6 ml-2"
					/>
				</SelectItem>
			</SelectContent>
		</Select>
	);
}

export default DeliveryLocationButton;
