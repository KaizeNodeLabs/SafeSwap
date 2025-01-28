"use client";

import React from "react";
import { PackageX } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";


const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-primary">
      <PackageX className="w-24 h-24 text-muted-foreground text-bold" />
      <h1 className="text-2xl text-secondary font-bold mt-4">Product Not Found</h1>
      <p className="text-muted-foreground mt-2">
        Sorry, we couldn't find the product you're looking for. It might have
        been removed or doesn't exist.
      </p>
      <div className="mt-6 space-x-4">
        <Button variant="secondary" onClick={() => router.push('/marketplace')}>
          Browse Marketplace
        </Button>
        <Button onClick={() => router.push('/')}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
