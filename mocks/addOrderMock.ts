import { IOrder } from "@/interfaces";

export default async function addOrderMock(order: IOrder) {
  console.log("Agregando orden...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return {
    id: 6,
    // clienteId: order.clienteId,
    fecha: order.fecha,
    total: order.total,
    // cliente: order.cliente,
  };
}