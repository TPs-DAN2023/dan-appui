import OrderState from "@/enums/OrderStates";
import { IOrder } from "@/interfaces";

export default function getPedidosMock(): IOrder[] {
  console.log("Buscando pedidos...");

  // Retrieve products data from localStorage
  const productsData = JSON.parse(localStorage.getItem('mocks') || '[]').productos;

  return [
    {
      id: "1",
      numeroPedido: 1,
      fecha: "2021-10-10T00:00:00.000Z",
      user: "jperez",
      observaciones: "Salió todo bien!",
      detallePedido: [
        {
          descuento: 0,
          producto: productsData.find((prod: any) => prod.id === 1),
          cantidad: 10,
          // total: productsData.find((prod: any) => prod.id === 1).precio * 10,
          total: 1000,
        },
        {
          descuento: 0,
          producto: productsData.find((prod: any) => prod.id === 5),
          cantidad: 5,
          // total: productsData.find((prod: any) => prod.id === 5).precio * 5,
          total: 500,
        },
      ],
      estados: [
        {
          estado: OrderState.RECIBIDO,
          detalle: "El pedido está pendiente de aprobación",
          fechaEstado: "2021-10-10T00:00:00.000Z",
          userEstado: "jperez",
        },
        {
          estado: OrderState.RECHAZADO,
          detalle: "El pedido fue rechazado",
          fechaEstado: "2021-10-10T00:00:00.000Z",
          userEstado: "jperez",
        },
      ],
      total: 2500,
      cliente: {
        id: 1,
        razonSocial: "Juan Perez",
        correoElectronico: "cliente1@prueba.com",
        cuit: "20-12345678-9",
        maximoCuentaCorriente: 5000,
        deuda: 0,
      },
    },
  ];
}