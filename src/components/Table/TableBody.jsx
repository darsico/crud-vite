const TableBody = ({ data, filteredData }) => {
  return (
    <tbody className="text-sm divide-y divide-slate-100">
      {data &&
        filteredData
          .map((single, index) => {
            return (
              <tr key={index}>
                {single.map((each, index) => {
                  <td className="p-2 whitespace-nowrap" key={index}>
                    <button className="text-center font-medium text-slate-800">{each}</button>
                  </td>;
                })}
              </tr>
            );
          })
          .reverse()}
    </tbody>
  );
};

export default TableBody;
