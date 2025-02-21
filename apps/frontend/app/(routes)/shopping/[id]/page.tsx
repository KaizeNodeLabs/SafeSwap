"use client";

import NotFound from "@/app/not-found";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "@/hooks/useTranslations";
import { products } from "@/lib/mocks/products";
import Image from "next/image";
import { getProductKey } from "../../marketplace/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  AlertTriangle,
  CircleCheckBig,
  MessageSquare,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface ShoppingDetailsPageProps {
  params: {
    id: string;
  };
}

const messages = [
  {
    sender: "Seller",
    message:
      "Hello! Thank you for your purchase. Let me know if you have any questions.",
    timestamp: "6/1/2023, 4:00:00 PM",
    isBuyer: false,
  },
  {
    sender: "Buyer",
    message: "Hi! When can I expect the item to be shipped?",
    timestamp: "6/1/2023, 4:05:00 PM",
    isBuyer: true,
  },
  {
    sender: "Seller",
    message:
      "I'll be shipping it out tomorrow. You should receive it within 3-5 business days.",
    timestamp: "6/1/2023, 4:10:00 PM",
    isBuyer: false,
  },
  {
    sender: "Buyer",
    message: "Great! Do you provide a tracking number?",
    timestamp: "6/1/2023, 4:15:00 PM",
    isBuyer: true,
  },
  {
    sender: "Seller",
    message: "Yes, I'll send you the tracking number once it's shipped.",
    timestamp: "6/1/2023, 4:20:00 PM",
    isBuyer: false,
  },
  {
    sender: "Seller",
    message: "Thank you so much.",
    timestamp: "6/1/2023, 4:21:00 PM",
    isBuyer: false,
  },
];

export default function ShoppingDetailsPage({
  params,
}: ShoppingDetailsPageProps) {
  const { t } = useTranslations();

  const product = products.find((product) => Number(params.id) === product.id);

  if (!product) {
    return <NotFound />;
  }

  return (
    <section className="py-4 space-y-10">
      <h1 className="capitalize text-3xl font-bold">shopping details</h1>

      <div className="flex flex-col lg:flex-row justify-center gap-5 mx-auto">
        <Card className="h-full">
          <CardHeader>
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              width={320}
              height={320}
              priority
              className="mx-auto object-cover"
            />
            <p className="text-medium text-gray-500 px-4 pt-4">
              {t(
                `common.products.categories.${product.category.toLowerCase()}`
              )}
            </p>

            <CardTitle className="text-xl font-medium pt-0">
              {t(`common.products.items.${getProductKey(product.id)}.name`)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <span className="text-3xl font-bold">
              {t("common.productList.currency")}
              {product.price}
            </span>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 items-start">
            <p className="text-gray-700 text-sm leading-relaxed max-w-md">
              {product.description}
            </p>
            <Badge variant={"secondary"}>
              {t("shopping.escrowStatus.pending")}
            </Badge>
            <div className="flex gap-2">
              <Button>
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("shopping.pay")}
              </Button>
              <Button variant={"outline"}>
                <CircleCheckBig className="mr-2 h-4 w-4" />
                {t("shopping.markAsReceived")}
              </Button>
              <Button variant={"destructive"}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                {t("shopping.openDispute")}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium items-center flex">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="max-w-lg mx-auto">
              {messages.map((msg, index) => (
                <ChatMessage key={index} {...msg} />
              ))}
              <div className="flex gap-2 items-center">
                <Input type="text" placeholder="Type your message here" />
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

interface ChatMessageProps {
  sender: string;
  message: string;
  timestamp: string;
  isBuyer: boolean;
}

const ChatMessage = ({
  sender,
  message,
  timestamp,
  isBuyer,
}: ChatMessageProps) => {
  return (
    <div className={`flex ${isBuyer ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-md p-4 rounded-lg shadow-md dark:text-black ${
          isBuyer ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        <p className="font-bold">{sender}</p>
        <p className="mt-1">{message}</p>
        <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
      </div>
    </div>
  );
};
