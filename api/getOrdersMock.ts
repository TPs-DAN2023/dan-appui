import getProductsMock from "./getProductsMock";

export default function getPedidosMock(userId: number) {
  console.log("Buscando pedidos...");

  if (!userId) {
    throw "No se ha especificado el usuario!";
  }

  // Wait randomly between 300 and 5000 ms for our 'request'
  // const wait = Math.floor(Math.random() * 300) + 200;
  // await new Promise((p) => setTimeout(p, wait));

  // const localPedidos = localStorage.getItem(pedidos_key);
  // if (localPedidos) {
  //   console.log("Recuperamos tus pedidos!");
  //   return JSON.parse(localPedidos);
  // } else {
  //   console.log("Generamos tus pedidos!");
  //   const pedidos = pedidosMock();
  //   localStorage.setItem(pedidos_key, JSON.stringify(pedidos));
  //   return pedidos;
  // }

  return pedidosMock()
}

const pedidos_key = "pedidos";

const ESTADOS = [
  { id: 1, estado: "EN CAMINO" },
  { id: 2, estado: "RECIBIDO" },
  { id: 3, estado: "CANCELADO" },
];

const PRODUCTOS = getProductsMock(1);

function generarDetalleMock(id: number) {
  const producto = PRODUCTOS[Math.floor(Math.random() * PRODUCTOS.length)];
  const cantidad = Math.floor(Math.random() * 1000);
  const precio = producto.precio * cantidad;
  // console.log("Generando detalle", { id, producto, cantidad, precio });
  return { id, producto, cantidad, precio };
}

function generarPedidoMock(id: number) {
  const daysBefore = Math.floor(Math.random() * 30) + 1;
  // Today date
  const fechaPedido = new Date();
  const estado = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
  const detalleLength = Math.floor(Math.random() * 10) + 1;
  const detalle = Array.from({ length: detalleLength }, (_, index) => generarDetalleMock(index+1));
  const descripcion = `Pedido #${id} - ${detalleLength} productos - ${estado.estado}`;
  // console.log("Generando pedido", { id, fechaPedido, detalle, estado, descripcion })
  return { id, fechaPedido, detalle, estado, descripcion };
}

function pedidosMock() {
  const pedidosAmount = 10;
  console.log("Generando", pedidosAmount, "pedidos...")
  return Array.from({ length: pedidosAmount }, (_, index) => generarPedidoMock(index+1));
}