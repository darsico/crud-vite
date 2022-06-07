import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, DELETE_PRODUCT } from "./graphql-mutations";
import { GET_PRODUCTS } from "./graphql-queries";

export const getProducts = () => {
  const result = useQuery(GET_PRODUCTS);
  return result;
};

export const addProducts = () => {
  const result = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  return result;
};

export const deleteProducts = () => {
  const result = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  return result;
};
