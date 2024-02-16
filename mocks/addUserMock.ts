import { IUser } from "@/interfaces";

export default async function addUserMock(user: IUser) {
  console.log("Agregando usuario...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait, user));

  return {
    id: 5,
    userName: user.userName,
    password: user.password,
    correoElectronico: user.correoElectronico,
    tipoUsuario: user.tipoUsuario,
  };
}