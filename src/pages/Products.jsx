import React, { useEffect, useState } from "react";

import DeleteModal from "../components/DeleteHandle/DeleteModal";

import SearchBar from "../components/SearchBar/SearchBar";
import { deleteProducts, getProducts } from "../data/products/UseProducts";
import { formatValue } from "../utils/Utils";
import AddProductModal from "../components/AddModal/AddProductModal";
import SearchBarReact from "../components/SearchBar/SearchBarReact";
import RenderUI from "../utils/RenderUI";
import TableHead from "../components/Table/TableHead";

const Products = () => {
  const [filteredData, setFilteredData] = useState([]);

  const [deleteProduct] = deleteProducts();
  const keyData = getProducts();
  const { data } = keyData;

  useEffect(() => {
    if (data) {
      setFilteredData(queryProducts);
    }
  }, [data]);

  const handleServerDelete = (id) => {
    // console.log("delete product", id);
    deleteProduct({ variables: { id } });
  };
  const tableHeadData = ["Nombre", "Precio", "Stock", "Categoría", "Proveedor", "Clientes"];

  const queryProducts = data?.queryProduct;
  return (
    <RenderUI keyData={keyData}>
      <div className="bg-white border rounded-sm shadow-lg col-span-full xl:col-span-6 border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 md:grid-cols-[max-content_1fr_min-content] grid-rows-2 md:grid-rows-1 items-center gap-y-3 gap-x-4">
          <h2 className="col-span-2 text-xl font-semibold text-slate-800 w-fit md:col-span-1">Todos los productos</h2>
          <SearchBarReact />
          {/* <SearchBar data={queryProducts} setData={setFilteredData} /> */}
          <AddProductModal />
        </header>
        <div className="p-3">
          {data && filteredData.length === 0 ? (
            <section className="flex items-center justify-center h-[50vh]">
              <p className="text-2xl font-light">Agrega nuevos productos porfavor</p>
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
                        const { name, price, stock, category, supplier, costumer } = singleData;

                        return (
                          <tr key={singleData.id}>
                            <td className="p-2 whitespace-nowrap">
                              <button className="font-medium text-center text-slate-800">{name || "No ingreso empresa"}</button>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <button className="text-center ">{formatValue(price) || "No ingreso el precio"}</button>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center">{stock || "No ingresó stock"} </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left ">{category?.name || "No ingresó categoría"}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{supplier?.name || "No ingresó proveedor"}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{costumer?.name || "No hay clientes"}</div>
                            </td>

                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center self-center justify-center gap-4 mx-auto text-xs text-center text-slate-400">
                                <span>{/* <EditSupplierModal data={singleData} /> */}</span>
                                <span>
                                  <DeleteModal type="supplier" deleteTitle="¿Deseas eliminar este proveedor?" handleServerDelete={handleServerDelete} data={singleData} />
                                </span>
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

export default Products;
