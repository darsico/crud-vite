import { gql } from "@apollo/client";
export const GET_SUPPLIERS = gql`
  query {
    querySupplier {
      id
      name
      email
      phoneNumber
      address
      ruc
      companyName
    }
  }
`;
