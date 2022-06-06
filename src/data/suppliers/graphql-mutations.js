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
  mutation createSupplier($name: String, $email: String, $phoneNumber: String, $ruc: Int, $address: String, $contactPerson: String) {
    addSupplier(input: [{ name: $name, email: $email, phoneNumber: $phoneNumber, ruc: $ruc, address: $address, contactPerson: $contactPerson }]) {
      supplier {
        id
        name
        contactPerson
        email
        phoneNumber
        ruc
        address
      }
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($id: [ID!], $email: String, $name: String, $phoneNumber: String, $ruc: Int, $address: String, $contactPerson: String) {
    updateSupplier(input: { filter: { id: $id }, set: { email: $email, name: $name, phoneNumber: $phoneNumber, ruc: $ruc, address: $address, contactPerson: $contactPerson } }) {
      supplier {
        email
        name
        phoneNumber
        ruc
        address
        contactPerson
      }
    }
  }
`;
