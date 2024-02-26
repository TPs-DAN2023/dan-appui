import { USER_TYPES } from "@/constants";
import { IUserType } from "@/interfaces";

export default function getUserTypesMock(): IUserType[] {
  console.log("Buscando tipos de usuario...");
  return [
    {
      id: 1,
      tipo: USER_TYPES.ADMIN,
    },
    {
      id: 2,
      tipo: USER_TYPES.USER,
    },
  ];
}