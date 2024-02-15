export default async function getCategoriesMock() {
  console.log("Buscando categorías...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return [
    {
      id: 1,
      nombre: "Tremendukis",
    },
    {
      id: 2,
      nombre: "Chimichangas",
    },
    {
      id: 3,
      nombre: "Papas",
    },
    {
      id: 4,
      nombre: "Coca Cola",
    },
    {
      id: 5,
      nombre: "Pepsi",
    },
    {
      id: 6,
      nombre: "Fanta",
    },
    {
      id: 7,
      nombre: "Sprite",
    },
    {
      id: 8,
      nombre: "Cerveza",
    },
    {
      id: 9,
      nombre: "Abc",
    },
  ];
}