import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($price: Float, $stock: Int, $name: String, $categoryId: ID, $supplierId: ID, $cost: Float) {
    addProduct(input: { name: $name, price: $price, stock: $stock, cost: $cost, supplier: { id: $supplierId }, category: { id: $categoryId } }) {
      product {
        id
        name
        price
        cost
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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: [ID!]) {
    deleteProduct(filter: { id: $id }) {
      product {
        id
      }
    }
  }
`;
