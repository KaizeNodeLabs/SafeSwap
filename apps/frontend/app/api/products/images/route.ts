import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

const GET_PRODUCT_IMAGES = gql`
  query GetProductImages {
    productImages {
      id
      productId
      imageUrl
    }
  }
`;

export async function GET() {
	try {
		const { data } = await client.query({ query: GET_PRODUCT_IMAGES });
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching product images:", error);
		return NextResponse.json(
			{ error: "Failed to fetch product images" },
			{ status: 500 },
		);
	}
}
