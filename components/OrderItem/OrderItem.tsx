interface OrderItemProps {
  order: {
    id: string;
    fechaPedido: string;
    estado: { id: string; estado: string };
    detalle: { id: string; producto: { id: number; descripcion: string; precio: number }; cantidad: number; precio: number }[];
  };
  onClick: any;
}

export default function OrderItem({ order, onClick }: OrderItemProps) {
  // const estado = order.estado.estado;
  return (
    <div className="rounded-lg p-4 cursor-pointer" onClick={() => onClick(order)}>
      <p className="text-medium font-bold capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
        {/* {`Id de Pedido: ${order.id}`} */}
        {"Id de pedido: " + order.id}
      </p>
      <hr className="mt-2 mb-1 border border-blue-400" />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small">
            {/* {`Fecha: ${dayjs(order.fechaPedido).locale(es).format("D MMMM YYYY")}`} */}
          </p>
          <p className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small">
            {/* {`Nº de productos: ${order.detalle.length}`} */}
            {order.detalle && order.detalle.length + " productos"}
          </p>
        </div>
        {/* <span
          className={`px-2 py-1 rounded ${
            estado === "RECIBIDO"
              ? "bg-green-500"
              : estado === "CANCELADO"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {estado}
        </span> */}
      </div>
      <hr className="mt-1 mb-1 border border-blue-400" />
      {/* <p className="text-xs italic mt-1">{"Obra: " + pedido.obra.descripcion}</p> */}
    </div>
  );
}
