export default async function getUserTypesMock() {
  console.log("Buscando tipos de usuario...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return [
    {
      id: 1,
      tipo: "Administrador",
    },
    {
      id: 2,
      tipo: "Vendedor",
    },
  ];
}