import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ROUTES, USER_TYPES } from "@/constants";
import Link from "next/link";
import { Button, IconButton, Loading } from "@/components";
import { useUser } from "@/hooks";
import { hasUserType } from "@/utils";

export default function NavBar() {
  const { setUserLoggedIn, loading } = useUser();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const session = JSON.parse(localStorage.getItem("session") || "{}");

  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("mocks");
    localStorage.removeItem("session");
    setUserLoggedIn(false);
    await router.push(ROUTES.LOGIN);
    console.log("Logged out");
  };

  const handleNavigation = async (route: string) => {
    await router.push(route);
  };

  if (loading) return <Loading />;

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
          <Button
            onClick={() => handleNavigation(ROUTES.ORDERS)}
            className="ml-2"
          >
            Pedidos
          </Button>
          <Button
            onClick={() => handleNavigation(ROUTES.PRODUCTS)}
            className="ml-2"
          >
            Productos
          </Button>
          {hasUserType(USER_TYPES.ADMIN) && (
            <Button
              onClick={() => handleNavigation(ROUTES.USERS)}
              className="ml-2"
            >
              Usuarios
            </Button>
          )}
          {hasUserType(USER_TYPES.USER) && (
            <Button
              color="green"
              onClick={() => handleNavigation(ROUTES.CART)}
              className="ml-2"
            >
              Ver carrito ({cart.length})
            </Button>
          )}
        </div>
        <div className="flex items-center gap-x-5">
          <FontAwesomeIcon icon={faUserCircle} className="w-7 h-7" />
          <div className="flex flex-col gap-y-1 text-right">
            <span>
              Hola,{" "}
              {Object.keys(session).length > 0
                ? session.userName.toUpperCase()
                : "USUARIO"}
            </span>
            <span>
              {Object.keys(session).length > 0
                ? "(Max. $" + session.cliente.maximoCuentaCorriente + ")"
                : 0}
            </span>
          </div>
          <Button color="red" disabled={loading} onClick={handleLogout}>
            {loading ? "Saliendo..." : "Salir"}
          </Button>
        </div>
      </div>
    </>
  );
}
