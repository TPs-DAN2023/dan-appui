export default async function getProductsMock(userId: number) {
  console.log("Buscando productos...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return [
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
}
