'use client'

import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function Productos() {

  const [productsResult, setProductsResult] = useState({});

  const getAllProducts = async () => {
    // Fetch data from external API
    const res = await fetch('http://localhost/api/productos');
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    console.log(data);
    setProductsResult(data);
  }

  return (
    <>
      <h1 className="flex justify-center">Productos</h1>
      <section className="flex gap-4 justify-center">
        <CustomButton text="Get all" onClick={getAllProducts} />
      </section>
      <span>{ productsResult && JSON.stringify(productsResult) }</span>
      <section className="flex gap-4 justify-center mt-5">
        <CustomButton text="Volver" href="/" />
      </section>
    </>
  );
}