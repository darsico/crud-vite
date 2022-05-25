import { useQuery, useMutation } from "@apollo/client";
import { CREATE_SUPPLIER, DELETE_SUPPLIER, UPDATE_SUPPLIER } from "./graphql-mutations";
import { GET_SUPPLIERS } from "./graphql-queries";

export const getSuppliers = () => {
  const result = useQuery(GET_SUPPLIERS);
  return result;
};

export const deleteSuppliers = () => {
  const result = useMutation(DELETE_SUPPLIER, {
    refetchQueries: [{ query: GET_SUPPLIERS }],
  });
  return result;
};

export const addSupplier = () => {
  const result = useMutation(CREATE_SUPPLIER, {
    refetchQueries: [{ query: GET_SUPPLIERS }],
  });
  return result;
};

export const editSupplier = () => {
  const result = useMutation(UPDATE_SUPPLIER, {
    refetchQueries: [{ query: GET_SUPPLIERS }],
  });
  return result;
};
