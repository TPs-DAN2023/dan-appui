// import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants";
import Image from "next/image";
import Link from "next/link";
import { CancelButton, ConfirmButton } from "@/components";

export default function NavBar() {
  return (
    <>
      <div className="flex w-full justify-between p-2 md:p-4 items-center">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faShop} className="" />
          <h1 className="pl-4">Marketplace B2B</h1>
        </div>
        <div className="flex items-center justify-center gap-x-5">
          <Link href="/pedidos">
            <ConfirmButton onClick={() => {}} className="ml-2">
              Pedidos
            </ConfirmButton>
          </Link>
          <Link href="/productos">
            <ConfirmButton onClick={() => {}} className="ml-2">
              Productos
            </ConfirmButton>
          </Link>
          <Link href="/usuarios">
            <ConfirmButton onClick={() => {}} className="ml-2">
              Usuarios
            </ConfirmButton>
          </Link>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="w-8 h-8 relative">
            <Image
              src="/usuario.webp"
              alt="Usuario"
              layout="fill"
              sizes="100vw"
              className="rounded-full"
            />
          </div>
          <span>Hola, $NAME_USER</span>
          <Link href="/">
            <CancelButton
              onClick={() => {
                // router.push(ROUTES.LOGIN);
              }}
            >
              Salir
            </CancelButton>
          </Link>
        </div>
      </div>
    </>
  );
}
