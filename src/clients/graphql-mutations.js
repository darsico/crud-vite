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

export const UPDATE_COSTUMER = gql`
  mutation updateCostumer($id: [ID!], $email: String, $name: String, $phoneNumber: String) {
    updatecostumers(input: { filter: { id: $id }, set: { email: $email, name: $name, phoneNumber: $phoneNumber } }) {
      costumers {
        email
        name
        phoneNumber
      }
    }
  }
`;
