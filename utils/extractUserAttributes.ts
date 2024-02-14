import { IUser } from "@/interfaces";

export default function extractUserAttributes(user: IUser) {
  const attributes = { title: "", body: [""], footer: "", status: "" };
  attributes.title = user.userName;
  attributes.body = [`Correo: ${user.correoElectronico}`, `Tipo: ${user.tipoUsuario}`];
  attributes.footer = `ID: ${user.id}`;

  return attributes;
}