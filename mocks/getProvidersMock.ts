import { IProvider } from "@/interfaces";

export default function getProvidersMock(): IProvider[] {
  console.log("Buscando proveedores...");
  return [
    {
        id: 1,
        nombre: "Jose Giménez",
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