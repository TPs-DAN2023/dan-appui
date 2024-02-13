'use client'

import { Login, CustomButton } from "@/components";

export default function Home() {

  return (
    <>
      <main className="relative h-screen flex-col flex items-center justify-center">
        <Login />
      <section className="absolute bottom-4 right-4 flex flex-col gap-y-2 items-center">
        <h1>Hacer testing de los MS</h1>
        <CustomButton text="Testear MS" href="/test" />
      </section>
      </main>
    </>
  );
}