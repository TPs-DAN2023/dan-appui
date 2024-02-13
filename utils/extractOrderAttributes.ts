import { formatDate } from "./index"

interface OrderProps {
  id: string;
  fechaPedido: string;
  estado: { id: string; estado: string };
  detalle: { id: string; producto: { id: number; descripcion: string; precio: number }; cantidad: number; precio: number }[];
}

export default function extractOrderAttributes (order: OrderProps) {
  const attributes = {title: '', body: [''], footer: '', status: ''};
  attributes.title = `ID pedido: ${order.id}`;
  attributes.body = [`${order.detalle && order.detalle.length} productos`];
  attributes.footer = `Fecha: ${formatDate(order.fechaPedido)}`;
  attributes.status = `${order.estado && order.estado.estado}`

  return attributes;
}
