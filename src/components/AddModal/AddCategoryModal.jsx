/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

import { addCategory } from "../../data/categories/UseCategories";

import { useSnapshot } from "valtio";
import { category } from "../../store";

export default function AddCategoryModal({ childrenModal }) {
  const { register, handleSubmit, reset } = useForm();
  const { setCategoryCreated, setIsCreated } = useSnapshot(category);
  const [createCategory] = addCategory();
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const onSubmit = (data) => {
    const { name } = data;
    createCategory({ variables: { name } });
    if (childrenModal) {
      setCategoryCreated(data);
      setIsCreated(true);
    }
    setOpen(false);
    reset();
  };
  return (
    <>
      {childrenModal ? (
        <button className="text-xs font-normal cursor-pointer flex items-center justify-center gap-1 hover:font-bold transition-all" onClick={() => setOpen(true)}>
          <span className="text-lg self-center ">+</span> <span className="mt-1">Categoría</span>
        </button>
      ) : (
        <button className="flex items-center justify-center gap-1 bg-slate-100 rounded-full px-3  hover:bg-slate-200 transition-all text-sm ml-auto col-start-4 col-end-5 " onClick={() => setOpen(true)}>
          <span className="text-xl">+</span> Nueva categoría
        </button>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <div className="fixed z-30 inset-0 overflow-y-auto">
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
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Agregar categoría</h3>
                          <p className="mt-1 text-sm text-gray-600">Llena todos los campos para agregar al categoría, porfavor.</p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 ">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre de categoría
                                  </label>
                                  <input className="w-full border  rounded-md h-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 p-2" {...register("name", { required: true, maxLength: 20 })} />
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
