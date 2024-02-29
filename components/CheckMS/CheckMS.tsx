import { Button } from "@/components";
import { API_URLS, apiCall } from "@/services";
import { useState } from "react";

export default function CheckMS() {
  const [msStatus, setMsStatus] = useState({});
  const [error, setError] = useState("");

  const checkMicroService = async (msURL: string) => {
    setError("");
    setMsStatus({
      status: "Checking...",
    });
    try {
      const data = await apiCall<any>(msURL, "GET");
      setMsStatus(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setError(error.message);
        setMsStatus({});
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <header className="flex gap-3 pt-3">
        <Button
          onClick={() => checkMicroService(API_URLS.users + "/health")}
          color="red"
        >
          Check ms-usuarios
        </Button>
        <Button
          onClick={() => checkMicroService(API_URLS.products + "/health")}
          color="red"
        >
          Check ms-productos
        </Button>
        <Button
          onClick={() => checkMicroService(API_URLS.orders + "/health")}
          color="red"
        >
          Check ms-pedidos
        </Button>
      </header>
      <main>
        {Object.keys(msStatus).length > 0 && (
          <p>{JSON.stringify(msStatus, null, 2)}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </div>
  );
}
