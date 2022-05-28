import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./graphql-queries";

export const getCategories = () => {
  const result = useQuery(GET_CATEGORIES);
  return result;
};
