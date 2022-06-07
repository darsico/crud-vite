const TableHead = ({ data }) => {
  return (
    <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
      <tr>
        {data.map((single, index) => {
          return (
            <th className="p-2 whitespace-nowrap" key={index}>
              <div className="font-semibold text-left">{single}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
