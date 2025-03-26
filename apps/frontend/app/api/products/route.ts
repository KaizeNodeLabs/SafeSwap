import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      slug
      description
      price
      categoryId
      createdAt
      updatedAt
    }
  }
`;

export async function GET() {
	try {
		const { data } = await client.query({ query: GET_PRODUCTS });
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching products:", error);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 },
		);
	}
}
