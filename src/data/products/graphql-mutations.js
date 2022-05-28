import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($price: Float, $stock: Int, $name: String, $categoryName: String, $categoryId: ID, $companyName: String, $companyId: ID) {
    addProduct(input: { name: $name, price: $price, stock: $stock, supplier: { companyName: $companyName, id: $companyId }, category: { name: $categoryName, id: $categoryId } }) {
      product {
        id
        name
        price
        status
        stock
        category {
          id
          name
        }
        supplier {
          id
          companyName
        }
      }
    }
  }
`;
