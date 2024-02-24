"use client";

import { Loading, NavBar } from "@/components";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks";
import { withAuth } from "@/hocs";

function Home() {
  const { userLoggedIn, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading && !userLoggedIn) {
        await router.push(ROUTES.LOGIN);
      }
    };

    checkAuth();
  }, [userLoggedIn, loading, router]);

  // if (loading || !userLoggedIn) return <Loading />;

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
