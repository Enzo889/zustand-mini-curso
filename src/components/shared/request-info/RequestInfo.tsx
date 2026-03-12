import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/teslo.api";

const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((response) => setInfo(response.data))
      .catch(() => setInfo("Error al obtener la información"));
  }, []);
  return (
    <>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};

export default RequestInfo;
