"use client";

import { ApolloProvider } from "@apollo/client";
import type { PropsWithChildren } from "react";

import { client } from "@/lib/apollo-client";

export function ApolloClientProvider({ children }: PropsWithChildren<unknown>) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
