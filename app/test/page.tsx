'use client'

import Button from "@/components/Button";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function Test() {

  const [estadoMicroServicio,setEstadoMicroservicio] = useState({})

  const checkMicroService = async (msURL: string | URL | Request) => {
    // Fetch data from external API
    const res = await fetch(msURL);
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    console.log(data);
    setEstadoMicroservicio(data); 
  }


  return (
    <>
      <h1 className="flex justify-center">Elegir a que MS quiere pegarle</h1>
      <section className="flex gap-4 justify-center mt-5">
        <Button onClick={() => {checkMicroService('http://localhost/api/usuarios')}}>Check Usuarios</Button>
        <Button onClick={() => {checkMicroService('http://localhost/api/productos')}}>Check Productos</Button>
        <Button onClick={() => {checkMicroService('http://localhost/api/pedidos')}}>Check Pedidos</Button>
      </section>
      <span>{ estadoMicroServicio && JSON.stringify(estadoMicroServicio) }</span>
      <h1 className="flex justify-center">Prueba de redirección en el front</h1>
      <section className="flex gap-4 justify-center mt-5">
        <CustomButton text="ms-usuarios (TP-1)" href="/usuarios" />
        <CustomButton text="ms-productos (TP-2)" href="/productos" />
        <CustomButton text="ms-pedidos (TP-3)" href="/pedidos" />
      </section>
    </>
  );
}