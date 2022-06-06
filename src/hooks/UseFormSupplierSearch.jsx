import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { supplier } from "../store";
import { dataFound } from "../utils/dataFound";
import { checkTypeOfData } from "../utils/getStaticDataValues";

const UseFormSupplierSearch = (data, setData) => {
  const [value, setValue] = useState(null);

  const snap = useSnapshot(supplier);
  const { supplierCreated, clearSupplierCreated, isCreated, setIsCreated, setSupplierSelected, clearSupplierSelected } = snap;

  const onDropdownChange = (value) => {
    setValue(value);
    if (value === null) return setData(data);
    const filtered = data?.filter((single) => single.id === value.id);
    setSupplierSelected(value.id);
  };

  useEffect(() => {
    const supplierData = checkTypeOfData(supplierCreated);
    if (isCreated) {
      onDropdownChange(supplierData);
      const dataCreatedFiltered = dataFound(data, supplierCreated);
      setSupplierSelected(dataCreatedFiltered.id);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setValue(null);
      clearSupplierCreated();
      setIsCreated(false);
      clearSupplierSelected();
    };
  }, []);

  return [onDropdownChange, value];
};

export default UseFormSupplierSearch;
