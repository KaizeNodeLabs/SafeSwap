"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/lib/mocks/products";
import { generateProductSlug } from "@/utils/generateProductSlug";
import { MessageSquareMore, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function FeaturedProducts() {
  const t = useTranslations();

  return (
    <section className="py-12 px-4 md:px-8 dark:bg-white/5 bg-black/5">
      <div className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t("common.featuredProductsTitle.title")}
        </h2>

        <Carousel
          className="w-[calc(100%-64px)] sm:max-w-max touch-pan-y"
          opts={{ align: "start" }}
        >
          <CarouselContent className="-ml-1">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="w-full sm:mx-0 hover:shadow-lg">
                  <CardHeader>
                    <div className="aspect-square overflow-hidden">
                      <Link
                        href={`/marketplace/${generateProductSlug(
                          t(`common.featuredProducts.items.${product.id}.name`)
                        )}`}
                      >
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          width={320}
                          height={320}
                          priority
                          className="w-full h-full object-cover rounded-t-lg cursor-pointer"
                        />
                      </Link>
                    </div>
                    <p className="text-medium text-gray-500 px-4 pt-4">
                      {t(
                        `common.products.categories.${product.category.toLowerCase()}`
                      )}
                    </p>
                    <Link
                      href={`/marketplace/${generateProductSlug(
                        t(`common.featuredProducts.items.${product.id}.name`)
                      )}`}
                    >
                      <CardTitle className="text-xl font-medium cursor-pointer hover:underline pt-0">
                        {t(`common.featuredProducts.items.${product.id}.name`)}
                      </CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <span className="text-3xl font-bold">
                      {t("common.productList.currency")}
                      {product.price}
                    </span>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {t("common.productList.buy")}
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <MessageSquareMore className="mr-2 h-4 w-4" />
                      {t("common.productList.chatWithSeller")}
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
