import { ICategory } from "@/interfaces";

export default async function addCategoryMock(category: ICategory) {
  console.log("Agregando categoría...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return {
    id: 6,
    nombre: category.nombre,
  };
}