import Image from "next/image";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";

export const LanguageSelector = () => {
	const [selectedLanguage, setSelectedLanguage] = useState("en");

	return (
		<Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
			<SelectTrigger className="w-[85px] h-9 pr-0 flex items-center gap-1 text-sm border-none shadow-none focus:ring-0">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent className="min-w-[70px]">
				<SelectItem value="en" className="text-sm">
					<div className="flex items-between gap-2">
						<Image
							src="/images/en-flag.svg"
							alt="English"
							width={24}
							height={24}
							className="object-contain"
						/>
						<span>EN</span>
					</div>
				</SelectItem>
				<SelectItem value="es" className="text-sm">
					<div className="flex items-center gap-2">
						<Image
							src="/images/es-flag.svg"
							alt="Español"
							width={24}
							height={24}
							className="object-contain"
						/>
						<span>ES</span>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
};
