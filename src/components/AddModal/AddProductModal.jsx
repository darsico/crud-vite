import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { addProducts } from "../../data/products/UseProducts";
import { getSuppliers } from "../../data/suppliers/UseSuppliers";
// import UseFrontQuery from "../../hooks/UseFrontQuery";
import SearchBar from "../SearchBar/SearchBar";
import { getCategories } from "../../data/categories/UseCategories";
import AddSupplierModal from "./AddSupplierModal";

const AddProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [category, setCategory] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [createProduct] = addProducts();

  const { data: suppliersData, loading: suppliersLoading, error: suppliersError } = getSuppliers();
  const { data: categoryData, loading: categoryLoading, error: categoryError } = getCategories();

  const onSubmit = (data) => {
    // const {name, category, } = data
    console.log(supplier.id);
    console.log(category.id, "category");
    // createProduct()
    setIsOpen(false);
    reset();
  };
  const handleAddSupplier = () => {
    console.log("added");
  };
  if (suppliersLoading) return <p>loading...</p>;
  if (categoryLoading) return <p>loading...</p>;

  return (
    <>
      <button className="flex items-center justify-center gap-1 bg-slate-100 rounded-full px-3  hover:bg-slate-200 transition-all text-sm ml-auto col-start-4 col-end-5 " onClick={() => setIsOpen(true)}>
        <span className="text-xl">+</span> Agregar producto
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={() => setIsOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Agregar Producto
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Porfavor llena todas las secciones para crear el producto.</p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold" htmlFor="name">
                          Nombre del producto
                        </label>
                        <input className="w-full border  rounded-md h-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 p-2" {...register("name", { required: true, maxLength: 20 })} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-semibold flex justify-between items-center">
                          <label className="text-sm font-semibold" htmlFor="category">
                            Categoría
                          </label>
                          <button className="text-xs font-normal cursor-pointer flex items-center justify-center gap-1 hover:font-bold transition-all" onClick={handleAddSupplier}>
                            <span className="text-lg self-center ">+</span> <span className="mt-1">Categoría</span>
                          </button>
                        </div>
                        <div className="flex items-center">{categoryData ? <SearchBar data={categoryData.queryCategory} setData={setCategory} modalRounded={true} /> : <p>loading...</p>}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold" htmlFor="stock">
                          Stock
                        </label>
                        <input
                          className="w-full border  rounded-md h-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 p-2"
                          type="number"
                          placeholder="Ingresa stock"
                          {...register("stock", {
                            valueAsNumber: true,
                            // validate: (value) => value > 0,
                          })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-semibold flex justify-between items-center" htmlFor="supplier">
                          Proveedor
                          <AddSupplierModal childrenModal={true} setData={setSupplier} />
                        </div>
                        <div className="flex items-center">{suppliersData ? <SearchBar data={suppliersData.querySupplier} setData={setSupplier} modalRounded={true} /> : <p>loading...</p>}</div>
                      </div>
                      <input
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        value={"Agregar productos"}
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddProductModal;
