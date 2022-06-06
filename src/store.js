import { proxy, subscribe } from "valtio";

export const supplier = proxy({
  suppliers: [],
  setSuppliers: (data) => {
    supplier.suppliers = [...data];
  },
  supplierCreated: {},
  setSupplierCreated: (data) => {
    supplier.supplierCreated = { ...data };
  },
  clearSupplierCreated: () => {
    supplier.supplierCreated = {};
  },
  isCreated: false,
  setIsCreated: (boolean) => {
    supplier.isCreated = boolean;
  },
  supplierSelected: "",
  setSupplierSelected: (data) => {
    supplier.supplierSelected = data;
  },
  clearSupplierSelected: () => {
    supplier.supplierSelected = "";
  },
});

export const category = proxy({
  categories: [],
  setCategory: (data) => {
    category.categories = [...data];
  },
  categoryCreated: {},
  setCategoryCreated: (data) => {
    category.categoryCreated = { ...data };
  },
  clearCategoryCreated: () => {
    supplier.categoryCreated = {};
  },
  isCreated: false,
  setIsCreated: (boolean) => {
    category.isCreated = boolean;
  },
  categorySelected: "",
  setCategorySelected: (data) => {
    category.categorySelected = data;
  },
  clearCategorySelected: () => {
    category.categorySelected = "";
  },
});

subscribe(category, () => {
  const { categoryCreated } = category;
  console.log(categoryCreated, "CategoryCreated");
});
