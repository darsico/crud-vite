import { gql } from "@apollo/client";

export const DELETE_SUPPLIER = gql`
  mutation deleteSupplier($id: [ID!]) {
    deleteSupplier(filter: { id: $id }) {
      supplier {
        id
      }
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation createSupplier($name: String, $email: String, $phoneNumber: String, $ruc: Int, $address: String, $companyName: String) {
    addSupplier(input: [{ name: $name, email: $email, phoneNumber: $phoneNumber, ruc: $ruc, address: $address, companyName: $companyName }]) {
      supplier {
        id
        name
        email
        phoneNumber
        ruc
        address
        companyName
      }
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($id: [ID!], $email: String, $name: String, $phoneNumber: String, $ruc: Int, $address: String, $companyName: String) {
    updateSupplier(input: { filter: { id: $id }, set: { email: $email, name: $name, phoneNumber: $phoneNumber, ruc: $ruc, address: $address, companyName: $companyName } }) {
      supplier {
        email
        name
        phoneNumber
        ruc
        address
        companyName
      }
    }
  }
`;
