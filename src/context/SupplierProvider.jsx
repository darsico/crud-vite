import { createContext, useState } from "react";

export const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [supplierCreated, setSupplierCreated] = useState({});
  const data = { supplierCreated, setSupplierCreated };

  return <SupplierContext.Provider value={data}>{children}</SupplierContext.Provider>;
};
