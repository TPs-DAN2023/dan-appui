import { IOrder } from "@/interfaces";
import { ClearButton } from "..";

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
          <ClearButton onClick={() => onClearSelectionPressed()} />
        </div>
      }

      {/* <div className="mx-4 sm:mx-4 md:mx-20 mt-6">
        <OrderItem order={order} onClick={() => {}} />
      </div> */}

      <div className="mx-4 sm:mx-4 md:mx-20 mt-6 bg-blue-300 rounded-6 p-4">
        <div className="flex justify-between">
          <p className="text-medium font-bold">Detalle del pedido</p>

          <p className="text-medium font-bold">
            Total:
            <span className="text-medium font-bold ml-2">
              {`$${order.detallePedido.reduce(
                (suma, pd) => suma + pd.precio,
                0
              )}`}
            </span>
          </p>
        </div>

        <hr className="my-2" />

        {/* Iteramos sobre la lista de detalles de order para renderizar los elementos */}
        {order.detallePedido.map((dp) => (
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
