import { gql } from "@apollo/client";

export const DELETE_COSTUMER = gql`
  mutation deleteCostumer($id: [ID!]) {
    deleteCostumer(filter: { id: $id }) {
      costumer {
        id
      }
    }
  }
`;

export const CREATE_COSTUMER = gql`
  mutation createClient($name: String, $email: String, $phoneNumber: String) {
    addCostumer(input: [{ name: $name, email: $email, phoneNumber: $phoneNumber }]) {
      costumer {
        id
        name
        email
        phoneNumber
      }
    }
  }
`;

export const UPDATE_COSTUMER = gql`
  mutation updateCostumer($id: [ID!], $email: String, $name: String, $phoneNumber: String) {
    updateCostumer(input: { filter: { id: $id }, set: { email: $email, name: $name, phoneNumber: $phoneNumber } }) {
      costumer {
        email
        name
        phoneNumber
      }
    }
  }
`;
