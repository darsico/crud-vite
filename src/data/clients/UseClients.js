import { useQuery, useMutation } from "@apollo/client";
import { CREATE_COSTUMER, DELETE_COSTUMER, UPDATE_COSTUMER } from "./graphql-mutations";
import { GET_COSTUMERS } from "./graphql-queries";

export const getClients = () => {
  const result = useQuery(GET_COSTUMERS);
  return result;
};

export const deleteClients = () => {
  const result = useMutation(DELETE_COSTUMER, {
    refetchQueries: [{ query: GET_COSTUMERS }],
  });
  return result;
};

export const addClient = () => {
  const result = useMutation(CREATE_COSTUMER, {
    refetchQueries: [{ query: GET_COSTUMERS }],
  });
  return result;
};

export const editClient = () => {
  const result = useMutation(UPDATE_COSTUMER, {
    refetchQueries: [{ query: GET_COSTUMERS }],
  });
  return result;
};
