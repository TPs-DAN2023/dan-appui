import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface OrderHomeProps {
  show: boolean;
}

export default function OrderHome ({ show }: OrderHomeProps) {
  
  if (!show) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-y-10">
      <div className="flex flex-col items-center space-y-4 px-4 py-10 rounded-xl bg-blue-300 mx-4 sm:mx-4 md:mx-20">
        {/* <QuestionOutlineIcon className="w-14 h-14" /> */}
        <FontAwesomeIcon icon={faQuestionCircle} className="w-14 h-14" />
        <p className="text-xl text-center">
          No hay ningún pedido seleccionado
        </p>
        <hr />
        <p className="text-medium text-center">
          Seleccione un pedido de la lista para visualizar el detalle del mismo.
        </p>
      </div>
      <Button onClick={() => {}}>Crear un pedido</Button>  
    </div>
  );
  return (
    <div className="flex flex-col flex-grow justify-center items-center gap-y-5">
      <h1 className="text-4xl font-bold">Pedidos</h1>
    
    </div>
  );
}