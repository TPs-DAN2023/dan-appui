"use client";

import { Loading, NavBar } from "@/components";
import { withAuth } from "@/hocs";
import { useUser } from "@/hooks";

function Home() {
  const { loading } = useUser();

  if (loading) return <Loading />;

  return (
    <section className="h-screen flex flex-col">
      <header className="border border-b-blue-300">
        <NavBar />
      </header>
      <main className="flex overflow-x-hidden overflow-y-hidden flex-grow">
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-bold">Bienvenido a Marketplace B2B</h1>
          <p className="text-2xl">Selecciona una opción del menú</p>
        </div>
      </main>
    </section>
  );
}

export default withAuth(Home);
