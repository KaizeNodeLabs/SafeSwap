import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
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

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      imageUrl
    }
  }
`;

export const GET_PRODUCT_IMAGES = gql`
  query GetProductImages {
    productImages {
      id
      productId
      imageUrl
    }
  }
`;
