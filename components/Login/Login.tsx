"use client";

import { ConfirmButton } from "@/components";
import { useState } from "react";
import { authAPI } from "@/services";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { useUser } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const { setUserLoggedIn } = useUser();
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");

  const router = useRouter();

  const handleLogin = async (event: any) => {
    // Use preventDefault to stop the page from refreshing when the form is submitted
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      const result = await authAPI.login(user, password);

      // Store the session in localStorage
      localStorage.setItem("session", JSON.stringify(result));

      setUserLoggedIn(true);
      router.push(ROUTES.HOME);
    } catch (error) {
      if (error instanceof Error) {
        setError("Error al loguearse:" + error.message);
      }
      setError(
        "Un error desconocido ha ocurrido al intentar loguearse. Por favor, intente nuevamente."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center">
        <section className="flex flex-col p-14 rounded-lg mx-4 bg-blue-300 shadow-lg opacity-90">
          <header className="mb-6 text-3xl font-bold">
            TP Integrador - DAN 2023
          </header>
          <form onSubmit={handleLogin}>
            <div className="flex items-center mb-4 rounded-md bg-blue-50">
              <FontAwesomeIcon icon={faUser} className="mx-2 w-6 h-6" />
              <input
                className="p-2 rounded-md flex-grow bg-blue-50"
                id="user"
                onChange={(e) => setUser(e.target.value)}
                placeholder="Usuario"
                type="text"
                value={user}
                required
              />
            </div>
            <div className="flex items-center mb-4 rounded-md bg-blue-50">
              <FontAwesomeIcon icon={faLock} className="mx-2 w-6 h-6" />
              <input
                className="p-2 rounded-md flex-grow bg-blue-50"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                type={showPassword ? "text" : "password"}
                value={password}
                required
              />
              <button
                className="p-1 rounded-md bg-gray-300 mr-1 ml-1 hover:bg-gray-400 transition duration-200 ease-in-out text-sm"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <ConfirmButton
                type="submit"
                className="pl-10 pr-10"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Ingresando..." : "Ingresar"}
              </ConfirmButton>
              <span className="text-red-500 ml-4">{error}</span>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
