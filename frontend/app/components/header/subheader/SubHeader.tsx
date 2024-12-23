"use client";

import { CirclePlus } from "lucide-react";
import { useState } from "react";
import AddProductModal from "../../ui/add-product-modal";
import BreadcrumbNavigation from "../../ui/breadcrumb-navigation";
import { Button } from "../../ui/button";

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
