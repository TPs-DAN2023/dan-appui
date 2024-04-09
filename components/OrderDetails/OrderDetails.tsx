import { IOrder } from "@/interfaces";
import { IconButton } from "@/components";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrderDetailsProps {
  order?: IOrder;
  onClearSelectionPressed: VoidFunction;
  show: boolean;
}

export default function OrderDetails({
  order,
  onClearSelectionPressed,
  show,
}: OrderDetailsProps) {
  if (!show || !order) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      {
        <div className="flex mx-4 sm:mx-4 md:mx-20 mt-6 flex-row-reverse text-2xl">
          <IconButton onClick={() => onClearSelectionPressed()}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </IconButton>
        </div>
      }

      <div className="mx-4 sm:mx-4 md:mx-20 mt-6 bg-blue-300 rounded-6 p-4">
        <div className="flex justify-between">
          <p className="text-medium font-bold">Detalle del pedido</p>

          <p className="text-medium font-bold">
            Total:
            <span className="text-medium font-bold ml-2">
              {`$${order.detallePedido.reduce(
                (suma, pd) => suma + pd.producto.precio * pd.cantidad,
                0
              )}`}
            </span>
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col flex-5">
            <p className="text-sm">{`ID pedido: #${order.id}`}</p>
            <p className="text-sm">{order.observaciones}</p>
          </div>
        </div>

        <hr className="my-2" />

        {order.detallePedido.map((dp) => (
          <div key={dp.total}>
            <div className="flex justify-between">
              <div className="flex flex-col flex-5">
                <p className="font-semibold">{dp.producto.nombre}</p>
                <p className="text-sm">{dp.producto.descripcion}</p>
                <div className="flex flex-col justify-between">
                  <p className="text-xs">{`Unidades: ${dp.cantidad}`}</p>
                  <p className="text-xs">{`Precio Unitario: $${dp.producto.precio}`}</p>
                </div>
              </div>
              <div className="flex flex-col self-center font-semibold">
                <p className="text-xs text-center">Total</p>
                <p className="text-xs text-center">{`$${
                  dp.producto.precio * dp.cantidad
                }`}</p>
              </div>
            </div>
            <hr className="my-1" />
          </div>
        ))}
      </div>

      {order.estados?.[order.estados?.length - 1]?.estado === "RECHAZADO" && (
        <div className="mx-4 sm:mx-4 md:mx-20 mt-6 bg-red-300 rounded-6 p-4">
          <p className="text-medium font-bold">
            El estado del pedido es RECHAZADO
          </p>
          <p className="text-sm">
            Razón: {order.estados?.[order.estados?.length - 1]?.detalle}
          </p>
        </div>
      )}
    </div>
  );
}
