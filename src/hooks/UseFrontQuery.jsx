import { useEffect } from "react";

const UseFrontQuery = (data, setData) => {
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);
};

export default UseFrontQuery;
