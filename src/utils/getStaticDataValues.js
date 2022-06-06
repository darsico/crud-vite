export const checkTypeOfData = (data) => {
  if (!data) return null;

  switch (data.__typename) {
    case "Supplier":
      return { value: data.name, label: data.name, id: data.id, contactPerson: data.contactPerson };
    default:
      return { value: data.name, label: data.name, id: data.id };
  }
};

export const getFilteredDataTypes = (data) => {
  const dataFiltered = data?.map((data) => checkTypeOfData(data));
  return dataFiltered;
};
