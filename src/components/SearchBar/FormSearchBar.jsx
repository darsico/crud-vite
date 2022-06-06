import FormCategorySearch from "./FormSearchBars/FormCategorySearch.jsx";
import FormSupplierSearch from "./FormSearchBars/FormSupplierSearch.jsx";

const FormSearchBar = ({ data, setData }) => {
  const { __typename } = data[0];
  switch (__typename) {
    case "Supplier":
      return <FormSupplierSearch data={data} setData={setData} />;
    case "Category":
      return <FormCategorySearch data={data} setData={setData} />;
    default:
      return <p className="text-sm opacity-50 font-bold ">No hay datos</p>;
  }
};
export default FormSearchBar;
