import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory($name: String) {
    addCategory(input: [{ name: $name }]) {
      category {
        id
        name
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: [ID!]) {
    deleteCategory(filter: { id: $id }) {
      category {
        id
      }
    }
  }
`;
