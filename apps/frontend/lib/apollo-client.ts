import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_SERVER_URL,
	credentials: "same-origin",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
