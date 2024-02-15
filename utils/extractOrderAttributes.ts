import { IOrder } from "@/interfaces/IOrder";
import { formatDate } from "./index"

export default function extractOrderAttributes (order: IOrder) {
  const attributes = {title: '', body: [''], footer: '', status: ''};
  attributes.title = `ID pedido: ${order.id}`;
  attributes.body = [`Cantidad de productos: ${order.detallePedido && order.detallePedido.length}`, `Precio total: $${order.detallePedido && order.detallePedido.reduce((acc, item) => acc + item.precio, 0)}`, `Proveedor: ${order.proveedor.nombre} (id=${order.proveedor.id})`, `Usuario: ${order.user.userName} (id=${order.user.id})`, `Fecha: ${formatDate(order.fecha)}`];
  attributes.footer = `Observaciones: ${order.observaciones}`;
  attributes.status = `${order.estados && order.estados[order.estados.length - 1].estado	}`

  return attributes;
}
