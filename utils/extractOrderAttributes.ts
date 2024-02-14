import { IOrder } from "@/interfaces/IOrder";
import { formatDate } from "./index"

export default function extractOrderAttributes (order: IOrder) {
  const attributes = {title: '', body: [''], footer: '', status: ''};
  attributes.title = `ID pedido: ${order.id}`;
  attributes.body = [`${order.detallePedido && order.detallePedido.length} productos`, `Precio total: $${order.detallePedido && order.detallePedido.reduce((acc, item) => acc + item.precio, 0)}`];
  attributes.footer = `Fecha: ${formatDate(order.fecha)}`;
  attributes.status = `${order.estados && order.estados[0]}`

  return attributes;
}
