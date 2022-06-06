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
