import { IOrder } from "@/interfaces";
import { formatDate } from "./index"

export default function extractOrderAttributes (order: IOrder) {
  const attributes = {title: '', body: [''], footer: '', status: ''};
  attributes.title = `ID: ${order.id}`;
  attributes.body = [`Cantidad de órdenes: ${order.detallePedido && order.detallePedido.length}`, `Precio total: $${order.total}`, `Cliente: ${order.cliente.razonSocial} (id=${order.cliente.id})`, `Usuario: ${order.user}`, `Fecha: ${formatDate(order.fecha)}`];
  attributes.footer = `Observaciones: ${order.observaciones}, Num. pedido: ${order.numeroPedido}`;
  attributes.status = `${order.estados && order.estados[order.estados.length - 1].estado}`

  return attributes;
}
