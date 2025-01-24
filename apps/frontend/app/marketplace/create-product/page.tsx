"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const CreateProduct = () => {
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [imageError, setImageError] = useState<string>("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		if (selectedImages.length + files.length > 4) {
			setImageError("You can only upload up to 4 images");
			return;
		}

		setImageError(""); 
		const newImages = Array.from(files).map(file => URL.createObjectURL(file));
		setSelectedImages(prev => [...prev, ...newImages]);
	};

	const removeImage = (index: number) => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-4xl font-bold mb-8 text-center">Create New Product</h1>
			
			<form className="space-y-8" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<Label htmlFor="product-title">Title</Label>
					<Input
						id="product-title"
						placeholder="Product title"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						placeholder="Describe your product..."
						className="min-h-[150px]"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="price">Price</Label>
					<Input
						id="price"
						type="number"
						placeholder="0"
					/>
				</div>

				<div className="space-y-2">
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

				<div className="space-y-2">
					<Label htmlFor="images">Images (up to 4)</Label>
					<Input
						id="images"
						type="file"
						multiple
						accept="image/*"
						onChange={handleImageChange}
						disabled={selectedImages.length >= 4}
					/>
					{imageError && (
						<p className="text-sm text-destructive mt-2">{imageError}</p>
					)}
					
					<div className="grid grid-cols-2 gap-4 mt-4">
						{selectedImages.map((image, index) => (
							<div key={index} className="relative group">
								<Image
									src={image}
									alt={`Preview ${index + 1}`}
									width={300}
									height={300}
									className="rounded-lg object-cover w-full h-[200px]"
								/>
								<Button
									onClick={() => removeImage(index)}
									variant="destructive"
									size="icon"
									className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
									type="button"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				<Button type="submit" className="w-full">
					Save
				</Button>
			</form>
		</div>
	);
};

export default CreateProduct;
