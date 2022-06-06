import Select from "react-select";

import { getFilteredDataTypes } from "../../../utils/getStaticDataValues";
import UseFormCategorySearch from "../../../hooks/UseFormCategorySearch";

const FormCategorySearch = ({ data, setData }) => {
  const [onDropdownChange, value] = UseFormCategorySearch(data, setData);
  const options = getFilteredDataTypes(data) || [];
  return (
    <>
      <Select className="items-center justify-center w-56 col-span-3 row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-span-2" cacheOptions options={options} value={value} onChange={onDropdownChange} placeholder="Busca aquí" isClearable />
    </>
  );
};
export default FormCategorySearch;
