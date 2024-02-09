export default async function getProductsMock(userId: number) {
  console.log("Buscando productos...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return [
    {
      id: 1,
      nombre: "Producto 1",
      descripcion: "Descripción del producto 1",
      proveedor: "Proveedor 1",
      stockActual: 10,
      precio: 100
    },
    {
      id: 2,
      nombre: "Producto 2",
      descripcion: "Descripción del producto 2",
      proveedor: "Proveedor 2",
      stockActual: 5,
      precio: 200
    },
    {
      id: 3,
      nombre: "Producto 3",
      descripcion: "Descripción del producto 3",
      proveedor: "Proveedor 3",
      stockActual: 8,
      precio: 300
    },
  ];
}