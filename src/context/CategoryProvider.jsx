import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryCreated, setCategoryCreated] = useState({});
  const data = { categoryCreated, setCategoryCreated };

  return <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>;
};
