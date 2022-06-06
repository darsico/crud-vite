import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { category } from "../store";
import { dataFound } from "../utils/dataFound";
import { checkTypeOfData } from "../utils/getStaticDataValues";

const UseFormCategorySearch = (data, setData) => {
  const [value, setValue] = useState(null);

  const snap = useSnapshot(category);
  const { categoryCreated, clearCategoryCreated, isCreated, setIsCreated, setCategorySelected, clearCategorySelected } = snap;

  const onDropdownChange = (value) => {
    setValue(value);
    if (value === null) return setData(data);
    const filtered = data?.filter((single) => single.id === value.id);
    setCategorySelected(value.id);
  };

  useEffect(() => {
    const dataCreated = checkTypeOfData(categoryCreated);
    if (isCreated) {
      onDropdownChange(dataCreated);
      const dataCreatedFiltered = dataFound(data, categoryCreated);
      setCategorySelected(dataCreatedFiltered.id);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setValue(null);
      clearCategoryCreated();
      setIsCreated(false);
      clearCategorySelected();
    };
  }, []);

  return [onDropdownChange, value];
};

export default UseFormCategorySearch;
