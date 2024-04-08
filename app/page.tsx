"use client";

import { Loading, NavBar, CheckMS } from "@/components";
import { USER_TYPES } from "@/constants";
import { withAuth } from "@/hocs";
import { useUser } from "@/hooks";
import { hasUserType } from "@/utils";

// Get actual mode
const developMode =
  typeof window !== "undefined"
    ? localStorage.getItem("developMode") === "true"
    : false;

function Home() {
  const { loading } = useUser();

  if (loading) return <Loading />;

  return (
    <section className="h-screen flex flex-col">
      <header className="border border-b-blue-300">
        <NavBar />
      </header>
      <main className="flex flex-col overflow-x-hidden overflow-y-hidden flex-grow">
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <h1 className="text-4xl font-bold">Bienvenido a Marketplace B2B</h1>
          <p className="text-2xl max-w-[800px] text-balance mt-4">
            {hasUserType(USER_TYPES.ADMIN)
              ? "Gestione usuarios, productos y cambie los estados de los pedidos realizados por los clientes rápido, seguro y sin vueltas!"
              : "Desde aquí podrá ver los productos disponibles y realizar pedidos de manera rápida, segura y sin vueltas!"}
          </p>
        </div>
        {!developMode && <CheckMS />}
      </main>
    </section>
  );
}

export default withAuth(Home);
