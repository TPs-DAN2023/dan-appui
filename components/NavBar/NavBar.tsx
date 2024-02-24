import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ROUTES, USER_TYPES } from "@/constants";
import Link from "next/link";
import {
  CancelButton,
  CartButton,
  ConfirmButton,
  IconButton,
} from "@/components";
import { useUser } from "@/hooks";
import { hasUserType } from "@/utils";

export default function NavBar() {
  const { setUserLoggedIn, loading } = useUser();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const session = JSON.parse(localStorage.getItem("session") || "{}");

  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("session");
    setUserLoggedIn(false);
    await router.push(ROUTES.LOGIN);
    console.log("Logged out");
  };

  const handleNavigation = async (route: string) => {
    await router.push(route);
  };

  return (
    <>
      <div className="flex w-full justify-between p-2 md:p-4 items-center">
        <div className="flex items-center">
          <Link href="/">
            <IconButton onClick={() => {}}>
              <FontAwesomeIcon icon={faShop} className="w-6 h-6" />
            </IconButton>
          </Link>
          <h1 className="pl-4">Marketplace B2B</h1>
        </div>
        <div className="flex items-center justify-center gap-x-5">
          <ConfirmButton
            onClick={() => handleNavigation(ROUTES.ORDERS)}
            className="ml-2"
          >
            Pedidos
          </ConfirmButton>
          <ConfirmButton
            onClick={() => handleNavigation(ROUTES.PRODUCTS)}
            className="ml-2"
          >
            Productos
          </ConfirmButton>
          {hasUserType(USER_TYPES.ADMIN) && (
            <ConfirmButton
              onClick={() => handleNavigation(ROUTES.USERS)}
              className="ml-2"
            >
              Usuarios
            </ConfirmButton>
          )}
          <CartButton
            onClick={() => handleNavigation(ROUTES.CART)}
            className="ml-2"
          >
            Ver carrito ({cart.length})
          </CartButton>
        </div>
        <div className="flex items-center gap-x-5">
          <FontAwesomeIcon icon={faUserCircle} className="w-7 h-7" />
          <span>
            Hola,{" "}
            {Object.keys(session).length > 0
              ? session.userName.toUpperCase()
              : "USUARIO"}
          </span>
          <CancelButton disabled={loading} onClick={handleLogout}>
            {loading ? "Saliendo..." : "Salir"}
          </CancelButton>
        </div>
      </div>
    </>
  );
}
