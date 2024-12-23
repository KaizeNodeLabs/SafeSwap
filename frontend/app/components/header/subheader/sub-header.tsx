"use client";

import { CirclePlus } from "lucide-react";
import { useState } from "react";

import AddProductModal from "@/app/components/marketplace/add-product-modal";
import BreadcrumbNavigation from "@/app/components/marketplace/breadcrumb-navigation";
import { Button } from "@/app/components/ui/button";

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

				<Button onClick={() => setShowModal(true)}>
					<CirclePlus className="w-5 h-5" />
					Add {name}
				</Button>
			</div>

			<AddProductModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</>
	);
};

export default SubHeader;
