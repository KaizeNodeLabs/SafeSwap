import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      imageUrl
    }
  }
`;

export async function GET() {
	try {
		const { data } = await client.query({ query: GET_CATEGORIES });
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 },
		);
	}
}
