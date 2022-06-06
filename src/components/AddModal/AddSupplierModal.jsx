/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

import { addSupplier } from "../../data/suppliers/UseSuppliers";

import { supplier } from "../../store";
import { useSnapshot } from "valtio";

export default function AddSupplierModal({ childrenModal }) {
  const { register, handleSubmit, reset } = useForm();

  const [createSupplier] = addSupplier();
  const [open, setOpen] = useState(false);
  const { setSupplierCreated, setIsCreated } = useSnapshot(supplier);

  const cancelButtonRef = useRef(null);

  const onSubmit = (data) => {
    const { name, email, phoneNumber, contactPerson, ruc, address } = data;

    createSupplier({ variables: { name, email, phoneNumber, contactPerson, ruc, address } });

    if (childrenModal) {
      setSupplierCreated(data);
      setIsCreated(true);
    }
    setOpen(false);
    reset();
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
  };
  return (
    <>
      {childrenModal ? (
        <button className="flex items-center justify-center gap-1 text-xs font-normal transition-all cursor-pointer hover:font-bold" onClick={() => setOpen(true)}>
          <span className="self-center text-lg ">+</span> <span className="mt-1">Proveedor</span>
        </button>
      ) : (
        <button className="flex items-center justify-center col-start-4 col-end-5 gap-1 px-3 ml-auto text-sm transition-all rounded-full bg-slate-100 hover:bg-slate-200 " onClick={() => setOpen(true)}>
          <span className="text-xl">+</span> Nuevo proveedor
        </button>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={handleCancel}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 z-30 overflow-y-auto">
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
                  <div className="px-4 pt-5 pb-4 bg-white sm:mt-0 sm:p-6 sm:pb-4">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Agregar proveedor</h3>
                          <p className="mt-1 text-sm text-gray-600">Llena todos los campos para agregar al proveedor, porfavor.</p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre de la empresa
                                  </label>
                                  <input type="text" autoComplete="name" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register("name", { required: true })} />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre completo del Representante
                                  </label>
                                  <input
                                    type="text"
                                    name="contactPerson"
                                    id="first-contactPerson"
                                    autoComplete="given-contactPerson"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register("contactPerson", { required: true })}
                                  />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                  </label>
                                  <input type="email" name="email" id="email-address" autoComplete="email" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register("email", { required: true })} />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Número de teléfono
                                  </label>
                                  <input type="text" name="phoneNumber" id="phone-number" autoComplete="phoneNumber" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register("phoneNumber", { required: true })} />
                                </div>

                                <div className="col-span-6 ">
                                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Dirección
                                  </label>
                                  <input type="text" name="address" id="address" autoComplete="address" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register("address", { required: true })} />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">
                                    RUC
                                  </label>
                                  <input type="number" name="ruc" id="ruc" autoComplete="ruc" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register("ruc", { required: true, valueAsNumber: true })} />
                                </div>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                              <input
                                type="submit"
                                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                // onClick={handleCancel}
                                value="Agregar"
                              ></input>
                              <button
                                type="button"
                                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleCancel}
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
