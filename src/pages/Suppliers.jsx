import React, { useEffect, useState } from "react";
import AddSupplierModal from "../components/AddModal/AddSupplierModal";

import EditSupplierModal from "../components/EditModal/EditSupplierModal.jsx";

import DeleteModal from "../components/DeleteHandle/DeleteModal";

import SearchBar from "../components/SearchBar/SearchBar";
import { deleteSuppliers, getSuppliers } from "../data/suppliers/UseSuppliers";

const Suppliers = () => {
  const [filteredData, setFilteredData] = useState([]);

  const [deleteSupplier] = deleteSuppliers();
  const { data, loading, error } = getSuppliers();

  useEffect(() => {
    if (data) {
      setFilteredData(querySuppliers);
    }
  }, [data]);

  const handleServerDelete = (id) => {
    deleteSupplier({ variables: { id } });
  };

  if (error) return <span>{error}</span>;
  if (loading) return <p>Loading...</p>;
  const querySuppliers = data?.querySupplier;
  return (
    <>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 md:grid-cols-[max-content_1fr_min-content] grid-rows-2 md:grid-rows-1 items-center gap-y-3 gap-x-4">
          <h2 className="font-semibold text-slate-800 text-xl w-fit col-span-2  md:col-span-1">Todos los proveedores</h2>
          <SearchBar data={querySuppliers} setData={setFilteredData} />
          <AddSupplierModal />
        </header>
        <div className="p-3">
          {data && filteredData.length === 0 ? (
            <section className="flex items-center justify-center h-[50vh]">
              <p className="text-2xl font-light">Agrega nuevos clientes porfavor</p>
            </section>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Empresa</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Representante</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Teléfono</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Dirección</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">RUC</div>
                    </th>
                    <th className="p-2 whitespace-nowrap"></th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {data &&
                    filteredData.map((singleData) => {
                      const { companyName } = singleData;
                      return (
                        <tr key={singleData.id}>
                          <td className="p-2 whitespace-nowrap">
                            <button className="text-center font-medium text-slate-800">{companyName || "No ingreso empresa"}</button>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <button className="text-center font-medium text-slate-800">{singleData.name || "No ingreso nombre"}</button>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{singleData.email || "No ingreso email"} </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left ">{singleData.phoneNumber || "No ingreso teléfono"}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{singleData.address || "No ha ingresado dirección"}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{singleData.ruc || "No ingreso ruc"}</div>
                          </td>

                          <td className="p-2 whitespace-nowrap">
                            <div className="text-xs text-slate-400  flex items-center justify-center gap-4 text-center self-center mx-auto">
                              <span>
                                <EditSupplierModal data={singleData} />
                              </span>
                              <span>
                                <DeleteModal type="supplier" deleteTitle="¿Deseas eliminar este proveedor?" handleServerDelete={handleServerDelete} data={singleData} />
                              </span>
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

export default Suppliers;
