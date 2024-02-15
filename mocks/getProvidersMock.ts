export default async function getProvidersMock() {
  console.log("Buscando proveedores...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return [
    {
        id: 1,
        nombre: "Jose Gimenez",
        mail: "josegimenez@gmail.com",
    },
    {
        id: 2,
        nombre: "Juan Perez",
        mail: "juanperez@gmail.com",
    },
    {
        id: 3,
        nombre: "Pedro Rodriguez",
        mail: "pedrorodriguez@gmail.com",
    },
  ];
}