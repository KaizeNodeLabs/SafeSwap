import { MapPin } from "lucide-react";
import Image from "next/image";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";

export function DeliveryCountry() {
	return (
		<div className="flex items-center">
			<MapPin />
			<p className="ml-2">Ship to</p>
			<Select defaultValue="CRC">
				<SelectTrigger className="w-[85px] border-none shadow-none px-1 focus:ring-0 text-base">
					<SelectValue placeholder="Select a country" />
				</SelectTrigger>
				<SelectContent className="min-w-[85px]">
					<SelectGroup>
						<SelectLabel>Countries</SelectLabel>
						<SelectItem
							value="CRC"
							className="flex items-center justify-between"
						>
							<div className="flex gap-1 items-center">
								CRC
								<Image
									src="/images/costa-rica.svg"
									alt="Costa Rica flag"
									width={20}
									height={14}
									priority
								/>
							</div>
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

export default DeliveryCountry;
