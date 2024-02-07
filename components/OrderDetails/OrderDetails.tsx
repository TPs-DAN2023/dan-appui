import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { OrderListElement } from "..";

const MX = [4, 4, 20];
const MT = 6;

/**
 * @param {{
 * pedido: {
 *  id: string,
 *  fechaPedido: string,
 *  obra: {id: string, descripcion: string},
 *  estado: {id: string, estado: string},
 *  detalle: {id: string, producto: {id: number, descripcion: string, precio: number}, cantidad: number, precio: number}[]
 * },
 * onMobileBackPressed: VoidFunction,
 * isBackVisible: boolean
 * }} props
 */

interface OrderDetailProps {
  pedido: {
    id: string;
    fechaPedido: string;
    obra: { id: string; descripcion: string };
    estado: { id: string; estado: string };
    detalle: { 
      id: string; 
      producto: { 
        id: number; 
        descripcion: string; 
        precio: number 
      }; 
      cantidad: number; 
      precio: number }[];
  } | null;
  onClearSelectionPressed: VoidFunction;
  isBackVisible: boolean;
}

export default function OrderDetail({ pedido, onClearSelectionPressed, isBackVisible }: OrderDetailProps) {
  if (!pedido)
    return (
      <div className="bg-red-700 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center space-y-4 px-4 py-10 rounded-xl bg-gray-700 mx-4 sm:mx-4 md:mx-20">
          {/* <QuestionOutlineIcon className="w-14 h-14" /> */}
          <FontAwesomeIcon icon={faQuestionCircle} className="w-14 h-14" />
          <p className="text-xl text-center">
            No hay ningún producto seleccionado
          </p>
          <hr />
          <p className="text-medium text-center">
            Seleccione un producto de la lista para visualizar el detalle del mismo.
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-red-700 flex flex-1 flex-col">
      {!isBackVisible && (
        <div className="flex mx-4 sm:mx-4 md:mx-20 mt-6 flex-row-reverse">
          <button
            className="rounded-3xl self-end"
            onClick={() => onClearSelectionPressed()}
          >
            {/* <MdClear /> */}
          </button>
        </div>
      )}

      <div className="mx-4 sm:mx-4 md:mx-20 mt-6">
        <OrderListElement pedido={pedido} setSelected={() => {}} />
      </div>

      <div className="mx-4 sm:mx-4 md:mx-20 mt-6 bg-gray-700 rounded-6 p-4">
        <div className="flex justify-between">
          <p className="text-medium font-bold">Detalle del pedido</p>

          <p className="text-medium font-bold">
            Total:
            <span className="text-medium font-bold ml-2">
              {`$${pedido.detalle.reduce((suma, pd) => suma + pd.precio, 0)}`}
            </span>
          </p>
        </div>

        <hr className="my-2" />

        {/* Iteramos sobre la lista de detalles de pedido para renderizar los elementos */}
        {pedido.detalle.map((dp) => (
          <div key={dp.id}>
            <div className="flex justify-between">
              <div className="flex flex-col flex-5">
                <p>{dp.producto.descripcion}</p>
                <div className="flex justify-between">
                  <p className="text-xs">{`Unidades: ${dp.cantidad}`}</p>
                  <p className="text-xs">{`Precio Unitario: $${dp.producto.precio}`}</p>
                </div>
              </div>
              <div className="flex flex-col self-center flex-1">
                <p className="text-xs text-center">Total</p>
                <p className="text-xs text-center">{`$${dp.precio}`}</p>
              </div>
            </div>
            <hr className="my-1" />
          </div>
        ))}
      </div>
    </div>
  );
}