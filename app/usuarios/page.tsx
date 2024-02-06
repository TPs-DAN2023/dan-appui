'use client'

import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function Usuarios() {
  
  const [usersResult, setUsersResult] = useState({});

  const getAllUsers = async () => {
    // Fetch data from external API
    const res = await fetch('http://localhost/api/usuarios');
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    console.log(data);
    setUsersResult(data);
  }

  return (
    <>
      <h1 className="flex justify-center">Usuarios</h1>
      <section className="flex gap-4 justify-center">
        <CustomButton text="Get all" onClick={getAllUsers} />
      </section>
      <span>{ usersResult && JSON.stringify(usersResult) }</span>
      <section className="flex gap-4 justify-center mt-5">
        <CustomButton text="Volver" href="/" />
      </section>
    </>
  );
}