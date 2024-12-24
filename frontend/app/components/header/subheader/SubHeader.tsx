"use client";

import { Button } from "@radix-ui/themes";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import AddProductModal from "../../ui/add-product-modal";
import BreadcrumbNavigation from "../../ui/breadcrumb-navigation";

interface SubHeaderProps {
	name: string;
}

const SubHeader = ({ name }: SubHeaderProps) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="flex justify-between items-center px-6 mt-4">
				{/* Breadcrumb Navigation */}
				<BreadcrumbNavigation />

				<Button
					className="flex items-center gap-2 bg-black cursor-pointer"
					onClick={() => setShowModal(true)}
				>
					<CirclePlus className="w-5 h-5" />
					Add {name}
				</Button>
			</div>

			<AddProductModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</>
	);
};

export default SubHeader;
