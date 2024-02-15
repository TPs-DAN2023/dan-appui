import { IUser } from "@/interfaces";

export default function extractUserAttributes(user: IUser) {
  const attributes = { title: "", body: [""], footer: "", status: "" };
  attributes.title = `${user.id} - ${user.userName}`;
  attributes.body = [`Tipo: ${user.tipoUsuario.tipo}`];
  attributes.footer = `Correo: ${user.correoElectronico}`;

  return attributes;
}