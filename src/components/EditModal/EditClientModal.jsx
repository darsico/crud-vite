/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { editClient } from "../../data/clients/UseClients";

export default function EditClientModal({ customer }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [editContactInfo, setEditContactInfo] = useState({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
  });
  const [updateCostumer] = editClient();

  const handleChange = (event) => {
    setEditContactInfo({ ...editContactInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, name, email, phoneNumber } = editContactInfo;
    updateCostumer({ variables: { id, name, email, phoneNumber } });
  };
  const handleCancelClick = () => {
    setEditContactInfo({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    });
    setOpen(false);
  };
  return (
    <>
      <button className="hover:text-slate-800" onClick={() => setOpen(true)}>
        Editar
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900 bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className=" sm:mt-0 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Editar cliente</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Haz click en el campo que quieres editar por favor.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombres y Apellidos
                                  </label>
                                  <input
                                    placeholder={customer.name}
                                    type="text"
                                    name="name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={editContactInfo.name}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                  </label>
                                  <input
                                    placeholder={customer.email}
                                    type="email"
                                    name="email"
                                    id="email-address"
                                    autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={editContactInfo.email}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Número de teléfono
                                  </label>
                                  <input
                                    placeholder={customer.phoneNumber}
                                    type="text"
                                    name="phoneNumber"
                                    id="phone-number"
                                    autoComplete="phoneNumber"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={editContactInfo.phoneNumber}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <input
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                value="Editar"
                              ></input>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
