import React, { useEffect, useState } from "react";

import DeleteModal from "../components/DeleteHandle/DeleteModal";

import SearchBar from "../components/SearchBar/SearchBar";
import { getProducts } from "../data/products/UseProducts";
import Spinner from "../components/Spinner/Spinner";
import { formatValue } from "../utils/Utils";
import AddProductModal from "../components/AddModal/AddProductModal";
const Products = () => {
  const [filteredData, setFilteredData] = useState([]);

  const { data, loading, error } = getProducts();

  useEffect(() => {
    if (data) {
      setFilteredData(queryProducts);
    }
  }, [data]);

  const handleServerDelete = (id) => {
    console.log("delete product");
    // deleteSupplier({ variables: { id } });
  };

  if (error) return <span>{error}</span>;
  if (loading) return <Spinner />;

  const queryProducts = data?.queryProduct;
  console.log(queryProducts);
  return (
    <>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 md:grid-cols-[max-content_1fr_min-content] grid-rows-2 md:grid-rows-1 items-center gap-y-3 gap-x-4">
          <h2 className="font-semibold text-slate-800 text-xl w-fit col-span-2  md:col-span-1">Todos los productos</h2>
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
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Nombre</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Precio</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Stock</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Categoría</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Proveedor</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Clientes</div>
                    </th>
                    <th className="p-2 whitespace-nowrap"></th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {data &&
                    filteredData.map((singleData) => {
                      const { name, price, stock, category, supplier, costumer } = singleData;

                      return (
                        <tr key={singleData.id}>
                          <td className="p-2 whitespace-nowrap">
                            <button className="text-center font-medium text-slate-800">{name || "No ingreso empresa"}</button>
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
                            <div className="text-left">{supplier?.companyName || "No ingresó proveedor"}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{costumer?.name || "No hay clientes"}</div>
                          </td>

                          <td className="p-2 whitespace-nowrap">
                            <div className="text-xs text-slate-400  flex items-center justify-center gap-4 text-center self-center mx-auto">
                              <span>{/* <EditSupplierModal data={singleData} /> */}</span>
                              <span>{/* <DeleteModal type="supplier" deleteTitle="¿Deseas eliminar este proveedor?" handleServerDelete={handleServerDelete} data={singleData} /> */}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          {/* Table */}
        </div>
      </div>
    </>
  );
};

export default Products;
