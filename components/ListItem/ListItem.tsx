interface ListItemProps {
  item: {
    id: string;
    [key: string]: any;
  }
  type: 'order' | 'product' | 'user';
  onClick: any;
}

export default function ListItem({ item, onClick }: ListItemProps) {

  switch (item.type) {
    case 'order':
      return <OrderListItem item={item} onClick={onClick} />;
    case 'product':
      return <ProductListItem item={item} onClick={onClick} />;
    case 'user':
      return <UserListItem item={item} onClick={onClick} />;
    default:
      return null;
  }

  return (
    <div className="rounded-lg p-4 cursor-pointer" onClick={() => onClick(item)}>
      <p className="text-medium font-bold capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
        {`Id de Pedido: ${item.id}`}
      </p>
      <hr className="mt-2 mb-1 border border-blue-400" />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small">
            {/* {`Fecha: ${dayjs(item.fechaPedido).locale(es).format("D MMMM YYYY")}`} */}
          </p>
          <p className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small">
            {`Nº de productos: ${item.detalle.length}`}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded ${
            item.estado === "RECIBIDO"
              ? "bg-green-500"
              : item.estado === "CANCELADO"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {item.estado}
        </span>
      </div>
      <hr className="mt-1 mb-1 border border-blue-400" />
      {/* <p className="text-xs italic mt-1">{"Obra: " + item.obra.descripcion}</p> */}
    </div>
  );
}