import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($price: Float, $stock: Int, $name: String, $categoryId: ID, $companyId: ID) {
    addProduct(input: { name: $name, price: $price, stock: $stock, supplier: { id: $companyId }, category: { id: $categoryId } }) {
      product {
        id
        name
        price
        status
        stock
        category {
          id
        }
        supplier {
          id
        }
      }
    }
  }
`;
