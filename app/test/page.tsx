"use client";

import { ConfirmButton } from "@/components";
import { useState } from "react";

export default function Test() {
  const [estadoMicroServicio, setEstadoMicroservicio] = useState({});

  const checkMicroService = async (msURL: string | URL | Request) => {
    // Fetch data from external API
    const res = await fetch(msURL);
    const data = await res.json();
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setEstadoMicroservicio(data);
  };

  return (
    <>
      <h1 className="flex justify-center">Elegir a que MS quiere pegarle</h1>
      <section className="flex gap-4 justify-center mt-5">
        <ConfirmButton
          onClick={() => {
            checkMicroService("http://localhost/api/usuarios");
          }}
        >
          Check Usuarios
        </ConfirmButton>
        <ConfirmButton
          onClick={() => {
            checkMicroService("http://localhost/api/productos");
          }}
        >
          Check Productos
        </ConfirmButton>
        <ConfirmButton
          onClick={() => {
            checkMicroService("http://localhost/api/pedidos");
          }}
        >
          Check Pedidos
        </ConfirmButton>
      </section>
    </>
  );
}
