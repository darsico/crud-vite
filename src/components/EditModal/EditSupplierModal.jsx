/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { editSupplier } from "../../data/suppliers/UseSuppliers";

export default function EditSupplierMOdal({ data }) {
  const initialData = {
    id: data.id,
    name: data.name,
    contactPerson: data.contactPerson,
    email: data.email,
    phoneNumber: data.phoneNumber,
    ruc: data.ruc,
    address: data.address,
  };
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [editContactInfo, setEditContactInfo] = useState(initialData);
  const [updateSupplier] = editSupplier();

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    setEditContactInfo((input) => {
      const nextInput = { ...input };

      switch (type) {
        case "number":
          nextInput[name] = Number(value);
          break;
        default:
          nextInput[name] = value;
      }
      return nextInput;
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, name, email, phoneNumber, ruc, address, contactPerson } = editContactInfo;
    updateSupplier({ variables: { id, name, email, phoneNumber, ruc, address, contactPerson } });
  };
  const handleCancelClick = () => {
    setEditContactInfo(initialData);
    setOpen(false);
  };
  return (
    <>
      <button className="hover:text-slate-800" onClick={() => setOpen(true)}>
        Editar
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="px-4 pt-5 pb-4 bg-white  sm:mt-0 sm:p-6 sm:pb-4">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Editar proveedor</h3>
                          <p className="mt-1 text-sm text-gray-600">Haz click en el campo que quieres editar por favor.</p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                          <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Empresa
                                  </label>
                                  <input
                                    placeholder={data.name}
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={editContactInfo.name}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre completo de Representante
                                  </label>
                                  <input
                                    placeholder={data.contactPerson}
                                    type="text"
                                    name="contactPerson"
                                    id="first-contactPerson"
                                    autoComplete="given-contactPerson"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={editContactInfo.contactPerson}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                  </label>
                                  <input
                                    placeholder={data.email}
                                    type="email"
                                    name="email"
                                    id="email-address"
                                    autoComplete="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={editContactInfo.email}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Número de teléfono
                                  </label>
                                  <input
                                    placeholder={data.phoneNumber}
                                    type="text"
                                    name="phoneNumber"
                                    id="phone-number"
                                    autoComplete="phoneNumber"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={editContactInfo.phoneNumber}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-span-6">
                                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Dirección
                                  </label>
                                  <input
                                    placeholder={data.address}
                                    type="text"
                                    name="address"
                                    id="address"
                                    autoComplete="address"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={editContactInfo.address}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-span-6">
                                  <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">
                                    RUC
                                  </label>
                                  <input placeholder={data.ruc} type="number" name="ruc" id="ruc" autoComplete="ruc" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={editContactInfo.ruc} onChange={handleChange} />
                                </div>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                              <input
                                type="submit"
                                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                value="Editar"
                              ></input>
                              <button
                                type="button"
                                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleCancelClick}
                                ref={cancelButtonRef}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
