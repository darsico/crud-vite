import { useQuery, useMutation } from "@apollo/client";
import { CREATE_CATEGORY, DELETE_CATEGORY } from "./graphql-mutations";
import { GET_CATEGORIES } from "./graphql-queries";

export const getCategories = () => {
  const result = useQuery(GET_CATEGORIES);
  return result;
};

export const addCategory = () => {
  const result = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });
  return result;
};

export const deleteCategories = () => {
  const result = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });
  return result;
};
