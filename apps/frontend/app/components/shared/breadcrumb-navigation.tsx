"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BreadcrumbNavigation() {
    const pathname = usePathname();
    
    const pathSegments = pathname.split('/').filter(segment => segment);

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-base">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {pathSegments.map((segment, index) => {
                    const pathTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const formattedSegment = segment
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, char => char.toUpperCase());

                    return (
                        <React.Fragment key={pathTo}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {index === pathSegments.length - 1 ? (
                                    <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={pathTo}>{formattedSegment}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
