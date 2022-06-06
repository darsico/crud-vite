import { useState } from "react";
import Select from "react-select";
import { checkTypeOfData } from "../../utils/getStaticDataValues.js";
import MiniLoader from "../Spinner/MiniLoader.jsx";
const SearchBarReact = ({ data, loading, setData }) => {
  const [value, setValue] = useState(null);

  const dataValues = data?.map((data) => checkTypeOfData(data));

  const options = dataValues || [];

  const onDropdownChange = (value) => {
    setValue(value);
    if (value === null) return setData(data);
    const filtered = data?.filter((single) => single.id === value.id);
    setData(filtered);
  };

  if (loading) return <MiniLoader />;

  return (
    <>
      <Select className="justify-center items-center w-56 row-start-2 row-end-3 col-span-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-span-2" cacheOptions options={options} value={value} onChange={onDropdownChange} placeholder="Busca aqui porfavor" isClearable />
    </>
  );
};

export default SearchBarReact;
