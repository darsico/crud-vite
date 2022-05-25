/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { addSupplier } from "../../data/suppliers/UseSuppliers";

export default function AddSupplierModal() {
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    ruc: "",
    address: "",
  };
  const [createSupplier] = addSupplier();
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [contactInfo, setContactInfo] = useState(initialState);

  const cleanModal = () => {
    setContactInfo(initialState);
  };

  const handleChange = (event) => {
    const { name, type, value } = event.target;
    setContactInfo((input) => {
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
    const { name, email, phoneNumber, companyName, ruc, address } = contactInfo;
    createSupplier({ variables: { name, email, phoneNumber, companyName, ruc, address } });
    setContactInfo(initialState);
  };
  return (
    <>
      <button className="flex items-center justify-center gap-1 bg-slate-100 rounded-full px-3  hover:bg-slate-200 transition-all text-sm ml-auto col-start-4 col-end-5 " onClick={() => setOpen(true)}>
        <span className="text-xl">+</span> Nuevo proveedor
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Agregar proveedor</h3>
                          <p className="mt-1 text-sm text-gray-600">Llena todos los campos para agregar al proveedor, porfavor.</p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre de la empresa
                                  </label>
                                  <input type="text" name="companyName" id="companyName" autoComplete="companyName" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={contactInfo.companyName} onChange={handleChange} />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre completo del Representante
                                  </label>
                                  <input type="text" name="name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={contactInfo.name} onChange={handleChange} />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                  </label>
                                  <input type="email" name="email" id="email-address" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={contactInfo.email} onChange={handleChange} />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Número de teléfono
                                  </label>
                                  <input type="text" name="phoneNumber" id="phone-number" autoComplete="phoneNumber" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={contactInfo.phoneNumber} onChange={handleChange} />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Dirección
                                  </label>
                                  <input type="text" name="address" id="address" autoComplete="address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={contactInfo.address} onChange={handleChange} />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">
                                    RUC
                                  </label>
                                  <input type="number" name="ruc" id="ruc" autoComplete="ruc" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={contactInfo.ruc} onChange={handleChange} />
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <input
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                value="Agregar"
                              ></input>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
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
