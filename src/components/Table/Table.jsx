import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ data, filteredData }) => {
  return (
    <>
      <TableHead data={data} />
      <TableBody data={data} filteredData={filteredData} />
    </>
  );
};

export default Table;
