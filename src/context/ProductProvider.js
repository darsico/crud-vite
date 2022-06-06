import { createContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const data = {};

  return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>;
};
