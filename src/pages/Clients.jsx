import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

import { deleteClients, getClients } from "../clients/UseClients";
import DeleteModal from "../components/DeleteHandle/DeleteModal";
import ModalAdd from "../components/ModalAdd/ModalAdd";
import ModalEdit from "../components/ModalEdit/ModalEdit";

const Clients = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [deleteCostumer] = deleteClients();
  const { data, loading, error } = getClients();

  const handleDeleteModalClick = () => {
    setOpenDelete(true);
  };

  const handleServerDelete = () => {
    const id = currentId;
    deleteCostumer({ variables: { id } });
  };

  if (error) return <span>{error}</span>;

  return (
    <>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 grid grid-cols-3 md:grid-cols-[max-content_1fr_min-content] grid-rows-2 md:grid-rows-1 items-center gap-y-3 gap-x-4">
          <h2 className="font-semibold text-slate-800 text-xl w-fit col-span-2  md:col-span-1">Todos los clientes</h2>
          <div className="relative  text-gray-600 flex justify-center items-center w-fit row-start-2 row-end-3 col-span-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-span-2 ">
            <input
              className="border-2 border-gray-300 bg-white h-8 rounded-full text-sm focus:outline-none w-full"
              type="search"
              name="search"
              placeholder="Buscar clientes"
            />
            <button type="submit" className="-ml-8 ">
              <BiSearch className="text-xl text-slate-500 hover:text-slate-900 transition-all" />
            </button>
          </div>
          <ModalAdd />
        </header>
        <div className="p-3">
          {data && data.querycostumers.length === 0 ? (
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
                    data.querycostumers.map((customer) => {
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
                              <ModalEdit customer={customer} />
                              <button className="hover:text-red-800" title="Eliminar" onClick={handleDeleteModalClick}>
                                <DeleteModal
                                  openDelete={openDelete}
                                  setOpenDelete={setOpenDelete}
                                  type="cliente"
                                  deleteTitle="¿Deseas eliminar este cliente?"
                                  handleServerDelete={handleServerDelete}
                                  uniqueId={customer.id}
                                  setCurrentId={setCurrentId}
                                />
                              </button>
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
