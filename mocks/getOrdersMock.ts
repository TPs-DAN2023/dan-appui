'use client'

import getProductsMock from "./getProductsMock";

export default async function getPedidosMock(userId: number) {
  console.log("Buscando pedidos...");

  if (!userId) {
    throw "No se ha especificado el usuario!";
  }

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
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

  return pedidosMock()
}

const pedidos_key = "pedidos";

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Pepsi",
    descripcion: "Qué rica gaseosa es!",
    proveedorId: 3,
    stockActual: 10,
    categoriaId: 9,
    proveedor: {
      id: 3,
      nombre: "Jose Gimenez",
      mail: "josegimenez@gmail.com",
    },
    categoria: {
      id: 9,
      nombre: "Abc",
    },
    precio: 100,
  },
  {
    id: 5,
    nombre: "Queso de oveja",
    descripcion: "Qué rico es!",
    proveedorId: 3,
    stockActual: 10,
    categoriaId: 1,
    proveedor: {
      id: 3,
      nombre: "Jose Gimenez",
      mail: "josegimenez@gmail.com",
    },
    categoria: {
      id: 1,
      nombre: "Tremendukis",
    },
    precio: 200,
  },
];

function pedidosMock() {
  return [
    {
      id: 1,
      fecha: new Date(),
      user: {
        id: 2,
        userName: "jrdoriguez",
        password: "Administrador123!",
        correoElectronico: "jrodriguez@user.com",
        tipoUsuario: {
          id: 2,
          tipo: "EMPLEADO",
        },
      },
      observaciones: "Salió todo bien!",
      proveedor: {
        id: 3,
        nombre: "Jose Gimenez",
        mail: "josegimenez@gmail.com",
      },
      detallePedido: [
        {
          id: 1,
          producto: PRODUCTOS[0],
          cantidad: 10,
          precio: PRODUCTOS[0].precio * 10,
        },
        {
          id: 2,
          producto: PRODUCTOS[1],
          cantidad: 5,
          precio: PRODUCTOS[1].precio * 5,
        },
      ],
      estados: [
        {
          id: 1,
          estado: "PENDIENTE",
        },
        {
          id: 2,
          estado: "RECHAZADO",
        },
      ],
      total: 2500,
    },
    {
      id: 2,
      fecha: new Date(),
      user:     {
        id: 1,
        userName: "jperez",
        password: "Administrador123!",
        correoElectronico: "jperez@user.com",
        tipoUsuario: {
          id: 1,
          tipo: "GERENTE",
        },
      },
      observaciones: "Se atrasó un toque!",
      proveedor: {
        id: 3,
        nombre: "Jose Gimenez",
        mail: "josegimenez@gmail.com",
      },
      detallePedido: [
        {
          id: 1,
          producto: PRODUCTOS[0],
          cantidad: 5,
          precio: PRODUCTOS[0].precio * 5,
        },
        {
          id: 2,
          producto: PRODUCTOS[1],
          cantidad: 2,
          precio: PRODUCTOS[1].precio * 2,
        },
      ],
      estados: [
        {
          id: 1,
          estado: "PENDIENTE",
        },
        {
          id: 2,
          estado: "ENVIADO",
        },
      ],
      total: 1500,
    },
  ];
}

// function generarDetalleMock(id: number) {
//   const producto = PRODUCTOS;
//   const cantidad = Math.floor(Math.random() * 1000);
//   const precio = producto.precio * cantidad;
//   // console.log("Generando detalle", { id, producto, cantidad, precio });
//   return { id, producto, cantidad, precio };
// }

// function generarPedidoMock(id: number) {
//   const daysBefore = Math.floor(Math.random() * 30) + 1;
//   // Today date
//   const fechaPedido = new Date();
//   const estado = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
//   const detalleLength = Math.floor(Math.random() * 10) + 1;
//   const detalle = Array.from({ length: detalleLength }, (_, index) => generarDetalleMock(index+1));
//   const descripcion = `Pedido #${id} - ${detalleLength} productos - ${estado.estado}`;
//   // console.log("Generando pedido", { id, fechaPedido, detalle, estado, descripcion })
//   return { id, fechaPedido, detalle, estado, descripcion };
// }

// function pedidosMock() {
//   const pedidosAmount = 10;
//   console.log("Generando", pedidosAmount, "pedidos...")
//   return Array.from({ length: pedidosAmount }, (_, index) => generarPedidoMock(index+1));
// }