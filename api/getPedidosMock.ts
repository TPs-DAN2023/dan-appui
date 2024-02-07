export default async function getPedidosMock(userId: number) {
  console.log("Buscando pedidos...");

  if (!userId) {
    throw "No se ha especificado el usuario!";
  }

  // Wait randomly between 1000 and 3000 ms for our 'request'
  const wait = Math.floor(Math.random() * 2001) + 1000;
  await new Promise((p) => setTimeout(p, wait));

  const localPedidos = localStorage.getItem(pedidos_key);
  if (localPedidos) {
    console.log("Recuperamos tus pedidos!");
    return JSON.parse(localPedidos);
  } else {
    console.log("Generamos tus pedidos!");
    const pedidos = pedidosMock();
    localStorage.setItem(pedidos_key, JSON.stringify(pedidos));
    return pedidos;
  }
}

const pedidos_key = "pedidos";

const ESTADOS = [
  { id: 1, estado: "EN CAMINO" },
  { id: 2, estado: "RECIBIDO" },
  { id: 3, estado: "CANCELADO" },
];

const PRODUCTOS = [
  // each product must have an id, name, description, price and quantity
  { id: 1, nombre: "Producto 1", descripcion: "Descripción del producto 1", precio: 100, cantidad: 10 },
  { id: 2, nombre: "Producto 2", descripcion: "Descripción del producto 2", precio: 200, cantidad: 20 },
  { id: 3, nombre: "Producto 3", descripcion: "Descripción del producto 3", precio: 300, cantidad: 30 },
  { id: 4, nombre: "Producto 4", descripcion: "Descripción del producto 4", precio: 400, cantidad: 40 },
  { id: 5, nombre: "Producto 5", descripcion: "Descripción del producto 5", precio: 500, cantidad: 50 },
  { id: 6, nombre: "Producto 6", descripcion: "Descripción del producto 6", precio: 600, cantidad: 60 },
  { id: 7, nombre: "Producto 7", descripcion: "Descripción del producto 7", precio: 700, cantidad: 70 },
  { id: 8, nombre: "Producto 8", descripcion: "Descripción del producto 8", precio: 800, cantidad: 80 },
  { id: 9, nombre: "Producto 9", descripcion: "Descripción del producto 9", precio: 900, cantidad: 90 },
  { id: 10, nombre: "Producto 10", descripcion: "Descripción del producto 10", precio: 1000, cantidad: 100 },
];

function generarDetalleMock() {
  // Random id
  const id = 1;
  const producto = PRODUCTOS[Math.floor(Math.random() * PRODUCTOS.length)];
  const cantidad = Math.floor(Math.random() * 1000);
  const precio = producto.precio * cantidad;
  // console.log("Generando detalle", { id, producto, cantidad, precio });
  return { id, producto, cantidad, precio };
}

function generarPedidoMock() {
  // Random id
  const id = 1;
  const daysBefore = Math.floor(Math.random() * 30) + 1;
  // Today date
  const fechaPedido = new Date();
  const estado = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
  const detalleLength = Math.floor(Math.random() * 10) + 1;
  const detalle = Array.from({ length: detalleLength }, generarDetalleMock);
  const descripcion = `Pedido #${id} - ${detalleLength} productos - ${estado.estado}`;
  // console.log("Generando pedido", { id, fechaPedido, detalle, estado, descripcion })
  return { id, fechaPedido, detalle, estado, descripcion };
}

function pedidosMock() {
  const pedidosAmount = Math.floor(Math.random() * 20) + 1;
  console.log("Generando", pedidosAmount, "pedidos...")
  return Array.from({ length: pedidosAmount }, generarPedidoMock);
}