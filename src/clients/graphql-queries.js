import { gql } from "@apollo/client";
export const GET_COSTUMERS = gql`
  query {
    querycostumers {
      id
      name
      email
      phoneNumber
      buyingAmount
      isOwing
    }
  }
`;
