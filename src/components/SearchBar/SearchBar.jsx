import { Fragment, useContext, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineSelector } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { SupplierContext } from "../../context/SupplierProvider";
import { CategoryContext } from "../../context/CategoryProvider";

const SearchBar = ({ modalRounded, data, setData }) => {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [dataMade, setDataMade] = useState();

  const { supplierCreated, setSupplierCreated } = useContext(SupplierContext) || {};

  const { categoryCreated, setCategoryCreated } = useContext(CategoryContext) || {};

  const pickDataType = (data) => {
    if (data && data[0]) {
      let dataType = data[0]?.__typename;
      let dataCreated;
      switch (dataType) {
        case "Supplier":
          return (dataCreated = { data: supplierCreated, setData: setSupplierCreated });
        case "Category":
          return (dataCreated = { data: categoryCreated, setData: setCategoryCreated });
        default:
          return (dataCreated = "No hay datos");
      }
    }
  };
  // const { categoryCreated, setCategoryCreated } = useContext(CategoryContext) || {};

  const clearBar = () => {
    setSelected("");
    setQuery("");
  };
  const dataNaming = (data) => {
    if (data?.__typename) {
      const { __typename } = data;
      let dynamicName = null;
      switch (__typename) {
        default:
          dynamicName = data.name;
          break;
      }
      return dynamicName;
    }
  };

  const filteredData =
    query === ""
      ? data
      : data?.filter((single) => {
          const dynamicName = dataNaming(single);
          return dynamicName?.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""));
        });

  const handleOptionClick = (id) => {
    const filtered = data?.filter((single) => single.id === id);
    setData(filtered);
  };
  const handleCancelClick = () => {
    clearBar();
  };
  const showSearchBarValue = (single) => dataNaming(single);

  const showOptionValue = (single) => dataNaming(single);
  useEffect(() => {
    setDataMade(data);
    const dataType = pickDataType(dataMade) || {};
    const singleDataCreated = dataType?.data || {};

    if (singleDataCreated) {
      const dataCreated = data?.find((created) => singleDataCreated?.name === created?.name) || {};
      setSelected(dataCreated);
    }
    return () => {
      setSelected();
      setDataMade();
    };
  }, [data]);

  return (
    <div className="items-center justify-center col-span-3 row-start-2 row-end-3 w-fit md:row-start-1 md:row-end-2 md:col-start-2 md:col-span-2 ">
      <Combobox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative">
              <div className="w-full">
                <Combobox.Input
                  className={`border-2 border-gray-300 bg-white text-sm focus:outline-none w-full  ${modalRounded ? "rounded-md h-full " : "rounded-full  h-8"}`}
                  displayValue={(single) => showSearchBarValue(single)}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Busca aquí"
                  inputMode="search"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">{open ? <MdOutlineCancel onClick={handleCancelClick} /> : <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />}</Combobox.Button>
              </div>
              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
                <Combobox.Options className="absolute mt-1 max-h-[inherit] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-60" static={true}>
                  {filteredData?.length > 0 ? null : <Combobox.Option>No hay datos</Combobox.Option>}
                  {filteredData?.length === 0 && query !== "" ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">Nada encontrado.</div>
                  ) : (
                    data &&
                    filteredData?.slice(0, 5).map((single) => {
                      const { id } = single;
                      return (
                        <Combobox.Option key={id} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-500 text-white" : "text-gray-900"}`} onClick={() => handleOptionClick(id)} value={single}>
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{showOptionValue(single)}</span>
                              {selected ? (
                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}>
                                  <BsCheck className="w-5 h-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      );
                    })
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SearchBar;
