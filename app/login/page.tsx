"use client";

import { login } from "@/services";
import { Button } from "@/components";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks";
import {
  mockUsers,
  mockProducts,
  mockOrders,
  mockCategories,
  mockProviders,
  mockUserTypes,
  mockSession,
} from "@/mocks";

export default function Login() {
  const { setUserLoggedIn } = useUser();
  const [error, setError] = useState("H");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");

  const [developMode, setDevelopMode] = useState(false);
  const [devUserType, setDevUserType] = useState(0);
  const warningDevelopMode = developMode
    ? "¡Cuidado! Probará el sistema sin conectarse a Docker, con datos mockeados."
    : "";

  useEffect(() => {
    setDevelopMode(localStorage.getItem("developMode") === "true");
  }, []);

  const router = useRouter();

  const handleChangeMode = () => {
    localStorage.setItem("developMode", (!developMode).toString());
    location.reload();
  };

  const handleLogin = async (event: any) => {
    // Use preventDefault to stop the page from refreshing when the form is submitted
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      console.log("Logging in...");
      if (developMode) {
        console.log("Development mode");
        // Initialize localStorage with static mock data
        localStorage.setItem(
          "mocks",
          JSON.stringify({
            tiposUsuario: mockUserTypes(),
            categorias: mockCategories(),
            proveedores: mockProviders(),
          })
        );

        // Append products and users which depends on the static data
        localStorage.setItem(
          "mocks",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("mocks") || "{}"),
            productos: mockProducts(),
            usuarios: mockUsers(),
          })
        );

        // Lastly, append the orders which depends on the products
        localStorage.setItem(
          "mocks",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("mocks") || "{}"),
            pedidos: mockOrders(),
          })
        );

        console.log(
          "Ingresando como usuario",
          devUserType === 1 ? "VENDEDOR" : "USUARIO_EMPRESA"
        );

        // Set the mock session
        localStorage.setItem(
          "session",
          JSON.stringify(mockSession(devUserType))
        );
      } else {
        console.log("Production mode");
        const result = await login(user, password);

        // Store the session in localStorage
        localStorage.setItem("session", JSON.stringify(result));
      }
      setUserLoggedIn(true);
      await router.push(ROUTES.HOME);
    } catch (error) {
      console.error("Error al loguearse:", error);
      if (error instanceof Error) {
        setError("Error al loguearse:" + error.message);
      }
      setError(
        "Ha ocurrido un error al intentar loguearse. Por favor, intente nuevamente."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="flex flex-col h-screen justify-between items-center">
      <div className="flex-grow flex flex-col w-full max-w-xl px-4 gap-y-2 items-center justify-center">
        <article
          className={`p-2 rounded-lg mx-4 opacity-90 text-center ${
            error.length > 1 ? "bg-red-200 shadow-lg " : "bg-transparent"
          }`}
        >
          <span
            className={`text-xs font-bold " ${
              error.length > 1 ? "text-red-700" : "text-transparent"
            }`}
          >
            {error}
          </span>
        </article>
        <article
          className={`p-2 rounded-lg mx-4 opacity-90 text-center ${
            warningDevelopMode.length > 1
              ? "bg-yellow-200 shadow-lg "
              : "bg-transparent"
          }`}
        >
          <span
            className={`text-xs font-bold " ${
              warningDevelopMode.length > 1
                ? "text-yellow-700"
                : "text-transparent"
            }`}
          >
            {warningDevelopMode}
          </span>
        </article>
        <section className="flex flex-col p-14 rounded-lg mx-4 bg-blue-300 shadow-lg opacity-90">
          <header className="mb-6 text-3xl font-bold">
            TP Integrador - DAN 2023
          </header>
          <form onSubmit={handleLogin}>
            {!developMode && (
              <>
                <div className="flex items-center mb-4 rounded-md bg-blue-50">
                  <FontAwesomeIcon icon={faUser} className="mx-2 w-6 h-6" />
                  <input
                    className="p-2 rounded-md flex-grow bg-blue-50"
                    id="user"
                    onChange={(e) => setUser(e.target.value)}
                    onFocus={() => setError("H")}
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
                    onFocus={() => setError("H")}
                    type="button"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </>
            )}
            <div className="flex flex-col items-center justify-center gap-y-3">
              {developMode && (
                <select
                  className="border-2 border-gray-300 p-2"
                  value={devUserType}
                  onChange={(e) => setDevUserType(parseInt(e.target.value))}
                >
                  <option value="" hidden>
                    Seleccione el tipo de su usuario
                  </option>
                  <option value="1">VENDEDOR</option>
                  <option value="2">USUARIO_EMPRESA</option>
                </select>
              )}
              <Button
                type="submit"
                className="pl-10 pr-10"
                disabled={isLoggingIn || (developMode && !devUserType)}
              >
                {isLoggingIn ? "Ingresando..." : "Ingresar"}
              </Button>
            </div>
          </form>
        </section>
      </div>
      <Button className="mb-2" onClick={handleChangeMode} color="green">
        Probar con {developMode ? "Docker" : "Mocks"}
      </Button>
    </main>
  );
}
