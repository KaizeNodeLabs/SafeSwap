import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formSchema } from "../schema/createProduct.schema";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "appliances", label: "Appliances" },
  { value: "sports", label: "Sports" },
];

export const useCreateProductHook = () => {
  const [selectedImages, setSelectedImages] = useState<
    { url: string; alt: string }[]
  >([]);
  const [imageError, setImageError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0]);

  const handleSelect = (option: { value: string; label: string }) => {
    setSelected(option);
    setOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      images: [],
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    console.log("submitting...", payload);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (selectedImages.length + files.length > 4) {
      setImageError("You can only upload up to 4 images");
      return;
    }

    setImageError("");
    const newImages = Array.from(files).map((file) => {
      const imageUrl = URL.createObjectURL(file);
      return { url: imageUrl, alt: file.name };
    });

    setSelectedImages((prev) => [...prev, ...newImages]);
    form.setValue("images", [
      ...(form.getValues("images") || []),
      ...newImages,
    ]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    form,
    onSubmit,
    categories,
    handleImageChange,
    imageError,
    handleSelect,
    removeImage,
    selected,
    open,
    setOpen,
    setSelected,
    selectedImages,
  };
};
