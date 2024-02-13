'use client'

import { SetStateAction, useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { NavBar, Loading } from "@/components";
import { on } from "events";

const Home = () => {

  const myId = 1; // Ideally, this should be retrieved with the actual user ID
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchData() {
      console.log('Loading')

      // Wait randomly between 300 and 5000 ms for our 'request'
      const wait = Math.floor(Math.random() * 300) + 200;
      await new Promise((p) => setTimeout(p, wait));
  
      setIsLoading(false)
    }

    fetchData()
  }, []);

  if (isLoading) return <Loading />;

  if (error) return "Something went wrong: " + error;

  return (
    <section className="h-screen flex flex-col">
      <header className="border border-b-blue-300">
        <NavBar/>
      </header>
      <main className="flex overflow-x-hidden overflow-y-hidden flex-grow">
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-bold">Bienvenido a Marketplace B2B</h1>
          <p className="text-2xl">Selecciona una opción del menú</p>
        </div>
      </main>
    </section>
  );
};

export default Home;
