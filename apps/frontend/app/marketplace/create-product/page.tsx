"use client";

import { useCreateProductHook } from "@/app/components/marketplace/hooks/useCreateProduct.hook";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Textarea } from "@/app/components/ui/textarea";
import { ChevronsUpDown, X } from "lucide-react";
import Image from "next/image";

const CreateProduct = () => {
  const {
    form,
    onSubmit,
    categories,
    handleImageChange,
    imageError,
    handleSelect,
    removeImage,
    selected,
    setSelected,
    open,
    setOpen,
    selectedImages,
  } = useCreateProductHook();

  return (
    <Form {...form}>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create New Product
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your product..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? parseFloat(value) : 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex items-center">Category</FormLabel>

                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                          aria-expanded={open}
                          onClick={() => setOpen(!open)}
                        >
                          {selected ? selected.label : "Select"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-52 p-0">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandList>
                            <CommandEmpty>No options found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  onSelect={() => {
                                    setSelected(option);
                                    field.onChange(option.value);
                                    handleSelect(option);
                                  }}
                                >
                                  {option.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="images">Images (up to 4)</FormLabel>
                <FormControl>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={selectedImages.length >= 4}
                  />
                </FormControl>
                {imageError && (
                  <p className="text-sm text-destructive mt-2">{imageError}</p>
                )}
                <FormMessage />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image.url}
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
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default CreateProduct;
