import { gql } from "@apollo/client";

export const DELETE_COSTUMER = gql`
  mutation deleteCostumer($id: [ID!]) {
    deletecostumers(filter: { id: $id }) {
      costumers {
        id
      }
    }
  }
`;

export const CREATE_COSTUMER = gql`
  mutation createClient($name: String, $email: String, $phoneNumber: String) {
    addcostumers(input: [{ name: $name, email: $email, phoneNumber: $phoneNumber }]) {
      costumers {
        id
        name
        email
        phoneNumber
      }
    }
  }
`;
