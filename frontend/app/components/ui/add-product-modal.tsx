import React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { Textarea } from "./textarea";

interface AddProductModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
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
						<Label htmlFor="product-name">Product Name</Label>
						<Input
							id="product-name"
							type="text"
							placeholder="Enter product name"
						/>
					</div>

					{/* Description */}
					<div>
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Enter product description"
							rows={4}
						/>
					</div>

					{/* Price */}
					<div>
						<Label htmlFor="price">Price</Label>
						<div className="relative mt-1">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								$
							</span>
							<Input
								id="price"
								type="text"
								placeholder="0.00"
								pattern="^\d+(\.\d{1,2})?$"
								className="pl-7"
							/>
						</div>
					</div>

					{/* Category */}
					<div>
						<Label htmlFor="category">Category</Label>
						<Select>
							<SelectTrigger id="category">
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="electronics">Electronics</SelectItem>
								<SelectItem value="furniture">Furniture</SelectItem>
								<SelectItem value="appliances">Appliances</SelectItem>
								<SelectItem value="sports">Sports</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Image Upload */}
					<div>
						<Label htmlFor="image">Image Upload</Label>
						<Input id="image" type="file" />
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

export default AddProductModal;
