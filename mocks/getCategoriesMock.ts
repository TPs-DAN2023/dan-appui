import { ICategory } from "@/interfaces";

export default function getCategoriesMock(): ICategory[] {
  console.log("Buscando categorías...");
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