import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineSelector } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
const SearchBar = ({ data, setData }) => {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const filteredData = query === "" ? data : data.filter((single) => single.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

  const handleOptionClick = (id) => {
    const filtered = data.filter((single) => single.id === id);
    setData(filtered);
  };
  const handleAllClick = () => {
    setData(data);
  };
  const showSearchBarValue = (single) => {
    if (single) return single.name;
  };

  const showOptionValue = (single) => {
    const { __typename } = single;
    switch (__typename) {
      case "Supplier":
        return single.companyName;
      default:
        return single.name;
    }
  };

  return (
    <div className="justify-center items-center w-fit row-start-2 row-end-3 col-span-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-span-2 ">
      <Combobox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative">
              <div className="w-full">
                <Combobox.Input className=" border-2 border-gray-300 bg-white h-8 rounded-full text-sm focus:outline-none w-full" displayValue={(single) => showSearchBarValue(single)} onChange={(event) => setQuery(event.target.value)} placeholder="Escribe aquí para buscar" inputMode="search" />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">{open ? <MdOutlineCancel /> : <HiOutlineSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />}</Combobox.Button>
              </div>
              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" static={true}>
                  <Combobox.Option className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-500 text-white" : "text-gray-900"}`} onClick={handleAllClick}>
                    Mostrar Todos
                  </Combobox.Option>
                  {filteredData.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nada encontrado.</div>
                  ) : (
                    filteredData.slice(0, 5).map((single) => {
                      const { id } = single;
                      return (
                        <Combobox.Option key={id} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-500 text-white" : "text-gray-900"}`} onClick={() => handleOptionClick(id)} value={single}>
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{showOptionValue(single)}</span>
                              {selected ? (
                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}>
                                  <BsCheck className="h-5 w-5" aria-hidden="true" />
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

// const SearchBar = () => {
//   return (
//     <div className="relative  text-gray-600 flex justify-center items-center w-fit row-start-2 row-end-3 col-span-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-span-2 ">
//       <input
//         className="border-2 border-gray-300 bg-white h-8 rounded-full text-sm focus:outline-none w-full"
//         type="search"
//         name="search"
//         placeholder="Buscar clientes"
//       />
//       <button type="submit" className="-ml-8 ">
//         <BiSearch className="text-xl text-slate-500 hover:text-slate-900 transition-all" />
//       </button>
//     </div>
//   );
// };

export default SearchBar;
