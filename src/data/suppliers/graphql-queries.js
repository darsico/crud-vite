import { gql } from "@apollo/client";
export const GET_SUPPLIERS = gql`
  query {
    querySupplier {
      id
      name
      contactPerson
      email
      phoneNumber
      address
      ruc
    }
  }
`;
