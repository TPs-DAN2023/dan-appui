'use client'

import { useState } from "react";
import { login } from '../api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";

export default function Login() {

  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState('');

  const router = useRouter();

  const handleLogin = async (event: any) => { // TODO: replace 'any' with the correct type

    // Use preventDefault to stop the page from refreshing when the form is submitted
    event.preventDefault();

    setIsLoggingIn(true);
    const result = await login(user, password);
    setIsLoggingIn(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    router.push('/testHome') 
  }

  return (
    <>
      <main className="flex items-center justify-center">
        <section className="flex flex-col p-14 rounded-lg mx-4 bg-blue-300 shadow-lg opacity-90">
          <header className="mb-6 text-3xl font-bold">TP Integrador - DAN 2023</header>
          <form onSubmit={handleLogin}>
            <div className="flex items-center mb-4 rounded-md bg-blue-50">
              <FontAwesomeIcon icon={faUser} className="mx-2" />
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
              <FontAwesomeIcon icon={faLock} className="mx-2" />
              <input
                className="p-2 rounded-md flex-grow bg-blue-50"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
              />
              <button
                className="p-1 rounded-md bg-gray-300 mr-1 ml-1 hover:bg-gray-400 transition duration-200 ease-in-out text-sm"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <div className="flex items-center justify-center">
            <button
              type="submit"
              className="p-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-200 ease-in-out pl-10 pr-10"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Ingresando...' : 'Ingresar'}
            </button>
            <span className="text-red-500 ml-4">{error}</span>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
