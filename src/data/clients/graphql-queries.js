import { gql } from "@apollo/client";
export const GET_COSTUMERS = gql`
  query {
    queryCostumer {
      id
      name
      email
      phoneNumber
      buyingAmount
      isOwing
    }
  }
`;
