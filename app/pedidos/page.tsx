'use client'

import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function Pedidos() {

  const [ordersResult, setOrdersResult] = useState({});

  const getAllPedidos = async () => {
    // Fetch data from external API
    const res = await fetch('http://localhost/api/pedidos');
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    console.log(data);
    setOrdersResult(data);
  }

  return (
    <>
      <h1 className="flex justify-center">Pedidos</h1>
      <section className="flex gap-4 justify-center">
        <CustomButton text="Get all" onClick={getAllPedidos} />
      </section>
      <span>{ ordersResult && JSON.stringify(ordersResult) }</span>
      <section className="flex gap-4 justify-center mt-5">
        <CustomButton text="Volver" href="/" />
      </section>
    </>
  );
}