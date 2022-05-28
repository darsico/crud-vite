import { gql } from "@apollo/client";
export const GET_PRODUCTS = gql`
  query {
    queryProduct {
      id
      name
      price
      status #sent canceled procesed
      stock
      supplier {
        id
        companyName
      }
      category {
        id
        name
      }
      costumer {
        id
        name
      }
    }
  }
`;
