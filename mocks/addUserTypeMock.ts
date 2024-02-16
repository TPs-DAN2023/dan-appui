import { IUserType } from "@/interfaces";

export default async function addUserTypeMock(userType: IUserType) {
  console.log("Agregando tipo de usuario...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return {
    id: 3,
    tipo: userType.tipo,
  };
}
