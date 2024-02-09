// import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons"
import { ROUTES } from "../../constants";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
  setSelectedTab: any;
}

export default function NavBar ({ setSelectedTab }: NavBarProps) {

  return (
    <>
      <div className="flex w-full justify-between p-2 md:p-4 items-center">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faShop} className="" />
          <h1 className="pl-4">Marketplace B2B</h1>
        </div>
        <div className="flex items-center justify-center gap-x-5">
          <button onClick={() => setSelectedTab('orders')} className="ml-2 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-700 transition-all">Pedidos</button>
          <button onClick={() => setSelectedTab('products')} className="ml-2 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-700 transition-all">Productos</button>
          <button onClick={() => setSelectedTab('users')} className="ml-2 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-700 transition-all">Usuarios</button>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="w-8 h-8 relative">
            <Image
              src="/usuario.webp"
              alt="Usuario"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <span>Hola, $NAME_USER</span>
          <Link href="/">
            <button
              className="text-sm text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white transition-all"
              onClick={() => {
                // router.push(ROUTES.LOGIN);
              }}
            >
              Salir
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}