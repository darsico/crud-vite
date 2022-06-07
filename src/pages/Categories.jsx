import { useEffect, useState } from "react";
import AddCategoryModal from "../components/AddModal/AddCategoryModal";
import DeleteModal from "../components/DeleteHandle/DeleteModal";
import SearchBarReact from "../components/SearchBar/SearchBarReact";
import Table from "../components/Table/Table";
import TableHead from "../components/Table/TableHead";
import { deleteCategories, getCategories } from "../data/categories/UseCategories";
import RenderUI from "../utils/RenderUI";

const Categories = () => {
  const [filteredData, setFilteredData] = useState([]);

  const [deleteCategory] = deleteCategories();
  const keyData = getCategories();
  const { data } = keyData;

  useEffect(() => {
    if (data) {
      setFilteredData(queryCategories);
    }
  }, [data]);

  const handleServerDelete = (id) => {
    console.log("delete product", id);

    deleteCategory({ variables: { id } });
  };
  const tableHeadData = ["Nombre"];

  const queryCategories = data?.queryCategory;

  return (
    <RenderUI keyData={keyData}>
      <div className="bg-white border rounded-sm shadow-lg col-span-full xl:col-span-6 border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 md:grid-cols-[max-content_1fr_min-content] grid-rows-2 md:grid-rows-1 items-center gap-y-3 gap-x-4">
          <h2 className="col-span-2 text-xl font-semibold text-slate-800 w-fit md:col-span-1">Todos las categorías</h2>
          <SearchBarReact />
          {/* <SearchBar data={queryCategories} setData={setFilteredData} /> */}
          <AddCategoryModal />
        </header>
        <div className="p-3">
          {data && filteredData.length === 0 ? (
            <section className="flex items-center justify-center h-[50vh]">
              <p className="text-2xl font-light">Agrega nuevas categorías porfavor</p>
            </section>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                {/* Table header */}
                <TableHead data={tableHeadData} />
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {data &&
                    filteredData
                      .map((singleData) => {
                        const { name } = singleData;
                        return (
                          <tr key={singleData.id}>
                            <td className="p-2 whitespace-nowrap">
                              <button className="font-medium text-center text-slate-800">{name || "No ingreso empresa"}</button>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center self-center justify-center gap-4 mx-auto text-xs text-center text-slate-400">
                                <span>{/* <EditSupplierModal data={singleData} /> */}</span>
                                <span>{<DeleteModal type="category" deleteTitle="¿Deseas eliminar esta categoría?" handleServerDelete={handleServerDelete} data={singleData} />}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                      .reverse()}
                </tbody>
              </table>
            </div>
          )}
          {/* Table */}
        </div>
      </div>
    </RenderUI>
  );
};

export default Categories;
