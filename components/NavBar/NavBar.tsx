// import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants";
import Link from "next/link";
import {
  CancelButton,
  CartButton,
  ConfirmButton,
  IconButton,
} from "@/components";

export default function NavBar() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  return (
    <>
      <div className="flex w-full justify-between p-2 md:p-4 items-center">
        <div className="flex items-center">
          {/* TODO: Change /testHome */}
          <Link href="/testHome">
            <IconButton onClick={() => {}}>
              <FontAwesomeIcon icon={faShop} className="w-6 h-6" />
            </IconButton>
          </Link>
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
          <Link href="/carrito">
            <CartButton onClick={() => {}} className="ml-2">
              Ver carrito ({cart.length})
            </CartButton>
          </Link>
        </div>
        <div className="flex items-center gap-x-5">
          <FontAwesomeIcon icon={faUserCircle} className="w-7 h-7" />
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
