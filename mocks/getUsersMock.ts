export default async function getUsersMock(userId: number) {
  console.log("Buscando usuarios...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((p) => setTimeout(p, wait));

  return [
    {
      id: 1,
      userName: "jperez",
      password: "Administrador123!",
      correoElectronico: "jperez@user.com",
      tipoUsuario: {
        id: 1,
        tipo: "GERENTE",
      },
    },
    {
      id: 2,
      userName: "jrdoriguez",
      password: "Administrador123!",
      correoElectronico: "jrodriguez@user.com",
      tipoUsuario: {
        id: 2,
        tipo: "EMPLEADO",
      },
    },
    {
      id: 3,
      userName: "ppicapiedra",
      password: "Administrador123!",
      correoElectronico: "ppcapiedra@user.com",
      tipoUsuario: {
        id: 2,
        tipo: "EMPLEADO",
      },
    },
  ];
}