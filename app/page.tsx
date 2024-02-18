"use client";

import { Login, ConfirmButton } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="relative h-screen flex-col flex items-center justify-center">
        <Login />
        <section className="absolute bottom-4 right-4 flex flex-col gap-y-2 items-center">
          <h1>Hacer testing de los MS</h1>
          <Link href="/test">
            <ConfirmButton onClick={() => {}} className="ml-2">
              Test MS
            </ConfirmButton>
          </Link>
        </section>
      </main>
    </>
  );
}
