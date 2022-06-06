export const dataFound = (data, dataCreated) => {
  switch (data.__typename) {
    case "Supplier":
      const supplierFound = data.find((data) => data.name === dataCreated.name && data.contactPerson === dataCreated.contactPerson);
      return supplierFound;
    default:
      const dataFound = data.find((data) => data.name === dataCreated.name);
      return dataFound;
  }
};
