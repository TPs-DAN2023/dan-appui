import { IProvider } from "@/interfaces";

export default async function addProviderMock(provider: IProvider) {
  console.log("Agregando proveedor...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return {
    id: 10,
    nombre: provider.nombre,
    mail: provider.mail,
  };
}