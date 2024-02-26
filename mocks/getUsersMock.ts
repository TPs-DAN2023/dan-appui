import { IUser } from "@/interfaces";

export default function getUsersMock(): IUser[] {
  console.log("Buscando usuarios...");

  // Retrieve userTypes data from localStorage
  const userTypesData = JSON.parse(localStorage.getItem('mocks') || '[]').tiposUsuario;

  return [
    {
      id: 1,
      userName: "jperez",
      password: "**********",
      correoElectronico: "jperez@user.com",
      tipoUsuario: userTypesData.find((tipo: any) => tipo.id === 1),
    },
    {
      id: 2,
      userName: "jrdoriguez",
      password: "**********",
      correoElectronico: "jrodriguez@user.com",
      tipoUsuario: userTypesData.find((tipo: any) => tipo.id === 2),
    },
    {
      id: 3,
      userName: "ppicapiedra",
      password: "**********",
      correoElectronico: "ppcapiedra@user.com",
      tipoUsuario: userTypesData.find((tipo: any) => tipo.id === 2),
    },
  ];
}