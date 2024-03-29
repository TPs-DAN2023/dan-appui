import { Button, IconButton } from "@/components";
import { ROUTES } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  const handleNavigation = async (route: string) => {
    await router.push(route);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-4xl text-red-500 flex gap-x-3 justify-center items-center">
        <IconButton onClick={() => {}}>
          <FontAwesomeIcon icon={faFaceFrown} className="w-6 h-6" />
        </IconButton>
        Carrito vacío
      </div>
      <p className="m-4 text-center">
        ¡Aún no has añadido productos al carrito!
      </p>
      <Button
        onClick={() => handleNavigation(ROUTES.PRODUCTS)}
        className="ml-2"
      >
        Buscar productos
      </Button>
    </div>
  );
}
