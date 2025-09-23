import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/teslo.api";

export const RequestInfo = () => {
  const [requestInfo, setRequestInfo] = useState<unknown>();
  
  useEffect(() => {
    tesloApi.get("/auth/private")
      .then(({ data }) => setRequestInfo(data))
      .catch(err => setRequestInfo(err.response?.data || err.message));
  }, []);
  
  return (
    <>
      <h2>Información</h2>

      <pre>
        {
          JSON.stringify(requestInfo, null, 2) || "No hay información"
        }
      </pre>
    </>
  )
}