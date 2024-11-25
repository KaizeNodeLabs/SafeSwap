import React from "react";
import { Button } from "./button";

interface ProductUploadModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ProductUploadModal: React.FC<ProductUploadModalProps> = ({
	isOpen,
	onClose,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6">
				<h2 className="text-2xl font-bold mb-4">Add New Product</h2>
				<form className="space-y-4">
					{/* Product Name */}
					<div>
						<label htmlFor="product-name" className="block text-sm font-medium">
							Product Name
						</label>
						<input
							id="product-name"
							type="text"
							placeholder="Enter product name"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
					{/* Description */}
					<div>
						<label htmlFor="description" className="block text-sm font-medium">
							Description
						</label>
						<textarea
							id="description"
							placeholder="Enter product description"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							rows={4}
						></textarea>
					</div>
					{/* Price */}
					<div>
						<label htmlFor="price" className="block text-sm font-medium">
							Price
						</label>
						<div className="relative mt-1">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								$
							</span>
							<input
								id="price"
								type="text"
								placeholder="0.00"
								pattern="^\d+(\.\d{1,2})?$" //Regualr expression to allow only numbers and 2 decimal points
								className="w-full pl-7 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
					</div>
					{/* Category */}
					<div>
						<label htmlFor="category" className="block text-sm font-medium">
							Category
						</label>
						<select
							id="category"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						>
							<option value="">Select a category</option>
							<option value="electronics">Electronics</option>
							<option value="furniture">Furniture</option>
							<option value="appliances">Appliances</option>
							<option value="sports">Sports</option>
						</select>
					</div>
					{/* Image Upload */}
					<div>
						<label htmlFor="image" className="block text-sm font-medium">
							Image Upload
						</label>
						<input
							id="image"
							type="file"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
				</form>
				{/* Buttons Save and Close */}
				<div className="flex justify-end space-x-4 mt-6">
					<Button variant="secondary" onClick={onClose}>
						Close
					</Button>
					<Button
						variant="default"
						className="bg-black text-white hover:bg-black/80"
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductUploadModal;
