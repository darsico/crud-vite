import React, { useEffect, useState } from "react";

import { deleteClients, getClients } from "../clients/UseClients";
import DeleteModal from "../components/DeleteHandle/DeleteModal";
import ModalAdd from "../components/ModalAdd/ModalAdd";
import ModalEdit from "../components/ModalEdit/ModalEdit";
import SearchBar from "../components/SearchBar/SearchBar";

const Clients = () => {
  const [filteredClients, setFilteredClients] = useState([]);

  const [deleteCostumer] = deleteClients();
  const { data, loading, error } = getClients();

  useEffect(() => {
    if (data) {
      setFilteredClients(data.querycostumers);
    }
  }, [data]);

  const handleServerDelete = (id) => {
    deleteCostumer({ variables: { id } });
  };

  if (error) return <span>{error}</span>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 md:grid-cols-[max-content_1fr_min-content] grid-rows-2 md:grid-rows-1 items-center gap-y-3 gap-x-4">
          <h2 className="font-semibold text-slate-800 text-xl w-fit col-span-2  md:col-span-1">Todos los clientes</h2>
          <SearchBar data={data.querycostumers} setData={setFilteredClients} />
          <ModalAdd />
        </header>
        <div className="p-3">
          {data && filteredClients.length === 0 ? (
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
                      <div className="font-semibold text-left">Nombre</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Teléfono</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Total Comprado</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Estado</div>
                    </th>
                    <th className="p-2 whitespace-nowrap"></th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {data &&
                    filteredClients.map((customer) => {
                      return (
                        <tr key={customer.id}>
                          <td className="p-2 whitespace-nowrap">
                            <button className="text-center font-medium text-slate-800">{customer.name}</button>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{customer.email}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left ">{customer.phoneNumber}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{customer.buyingAmount || "Aun no ha comprado"}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">
                              {customer.isOwing ? (
                                <button
                                  type="button"
                                  className="text-red-600 bg-red-100 rounded-lg px-2 text-sm hover:bg-red-200 transition-all"
                                >
                                  Debe
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="text-green-700 bg-green-100 rounded-lg px-2 text-sm hover:bg-green-200 transition-all "
                                >
                                  Sin Deudas
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-xs text-slate-400  flex items-center justify-center gap-4 text-center self-center mx-auto">
                              <span>
                                <ModalEdit customer={customer} />
                              </span>
                              <span>
                                <DeleteModal
                                  type="cliente"
                                  deleteTitle="¿Deseas eliminar este cliente?"
                                  handleServerDelete={handleServerDelete}
                                  data={customer}
                                />
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

export default Clients;
