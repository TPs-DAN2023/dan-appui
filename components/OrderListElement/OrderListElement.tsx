/**
 * @param {{
 * pedido: {
 *  id: string,
 *  fechaPedido: string,
 *  obra: {id: string, descripcion: string},
 *  estado: {id: string, estado: string},
 *  detalle: {id: string, producto: {id: number, descripcion: string, precio: number}, cantidad: number, precio: number}[]
 * },
 * setSelected: any
 * }} props
 */

interface OrderListElementProps {
  pedido: {
    id: string;
    fechaPedido: string;
    obra: { id: string; descripcion: string };
    estado: { id: string; estado: string };
    detalle: { id: string; producto: { id: number; descripcion: string; precio: number }; cantidad: number; precio: number }[];
  };
  setSelected: any;
}

function OrderListElement({ pedido, setSelected }: OrderListElementProps) {
  const estado = pedido.estado.estado;
  return (
    <div className="bg-gray-700 rounded-lg p-4 cursor-pointer" onClick={() => setSelected(pedido)}>
      <p className="text-medium font-bold capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
        {`Id de Pedido: ${pedido.id}`}
      </p>
      <hr className="mt-2 mb-1" />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small">
            {/* {`Fecha: ${dayjs(pedido.fechaPedido).locale(es).format("D MMMM YYYY")}`} */}
          </p>
          <p className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small">
            {`Nº de productos: ${pedido.detalle.length}`}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded ${
            estado === "RECIBIDO"
              ? "bg-green-500"
              : estado === "CANCELADO"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {estado}
        </span>
      </div>
      <hr className="mt-1 mb-1" />
      {/* <p className="text-xs italic mt-1">{"Obra: " + pedido.obra.descripcion}</p> */}
    </div>
  );
}
export default OrderListElement;

