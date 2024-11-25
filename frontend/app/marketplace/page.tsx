'use client';
import { type Dispatch, type SetStateAction, useState } from "react";
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu as HamIcon,
  Search,
  Home,
} from "lucide-react";
import { PersonIcon } from '@radix-ui/react-icons';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface SidebarComponentProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
}

interface HeaderComponentProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

interface ProductListProps {
  products: Product[];
}

const products: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1299, category: "Electronics" },
  { id: 2, name: "Smartphone X", price: 699, category: "Electronics" },
  { id: 3, name: "Ergonomic Chair", price: 299, category: "Furniture" },
  { id: 4, name: "Coffee Maker", price: 89, category: "Appliances" },
  { id: 5, name: "Running Shoes", price: 129, category: "Sports" },
  { id: 6, name: "Wireless Earbuds", price: 159, category: "Electronics" },
];

export default function Marketplace() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => 
    (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarComponent 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
          selectedCategories={selectedCategories} 
          handleCategoryChange={handleCategoryChange} 
        />
        <div className="flex-1 overflow-auto">
          <NavbarComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </SidebarProvider>
  );
}

function SidebarComponent({ priceRange, setPriceRange, selectedCategories, handleCategoryChange }: SidebarComponentProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-2">
          <PersonIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Hello, User</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-8">
          {/* Shop by Price */}
          <div className="p-6">
            <h3 className="mb-2 text-lg font-medium">Shop by Price</h3>
            <div className="flex justify-between text-lg">
            <div className="mb-4 flex justify-center text-lg">
              <span>
                ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}+
              </span>
            </div>
            </div>
            <Slider
              min={0}
              max={1500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-3"
            />
          </div>
          {/* Divider */}
          <div className="border-t"></div>
          {/* Shop by Department */}
          <div className="p-6">
            <h3 className="mb-2 text-lg font-medium">Shop by Department</h3>
            <div className="space-y-3">
              {["Electronics", "Furniture", "Appliances", "Sports"].map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="ml-3 text-lg">{category}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function NavbarComponent({ searchTerm, setSearchTerm }: HeaderComponentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const showHomeButton = pathname?.includes("/marketplace");

  return (
    <nav className="relative flex items-center justify-between flex-col md:flex-row p-4 md:p-6 border-b bg-white shadow-sm">
      <div className="flex flex-col w-full">
        <div>
          {/* Left Section: Home Button */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-4 w-full md:w-auto">
            {/* Home Button */}
            {showHomeButton && (
              <div className="flex justify-center mb-4 md:mb-0 md:absolute md:left-4 md:top-[26%] md:-translate-y-[26%] z-0 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 px-2 !h-12 w-full md:w-auto"
                  onClick={() => router.push("/")}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>
              </div>
            )}
          </div>

          {/* Center Section: Search Input */}
          <div className="flex-grow flex justify-center w-full">
            <div className="relative w-full max-w-[36rem] flex justify-center">
              <div className="flex items-center w-full md:ml-3">
                <Input
                  type="search"
                  placeholder="Search for products, brands, and more..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 px-4 pr-12 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-6 w-6" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          {/* Hamburger Menu */}
          <SidebarTrigger>
            <Button variant="outline" size="icon">
              <HamIcon className="h-6 w-6" />
            </Button>
          </SidebarTrigger>
          <div className="flex items-center gap-2 mt-2 p-1 bg-white hover:border hover:border-[#ccc] ml-4 text-sm cursor-pointer">
            Today's Deals
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProductList({ products }: ProductListProps) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Card key={product.id} className="p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-500">{product.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-2xl font-bold">${product.price}</span>
              <Button className="text-[16px] py-2 px-4">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
