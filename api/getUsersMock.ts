export default function getUsersMock(userId: number) {
  console.log("Buscando usuarios...");

  // Wait randomly between 300 and 5000 ms for our 'request'
  // const wait = Math.floor(Math.random() * 300) + 200;
  // await new Promise((p) => setTimeout(p, wait));

  return [
    {
      id: 1,
      username: "Usuario 1",
      password: "password1",
      correoElectronico: "usuario1@example.com",
      tipoUsuario: "admin",
    },
    {
      id: 2,
      username: "Usuario 2",
      password: "password2",
      correoElectronico: "usuario2@example.com",
      tipoUsuario: "user",
    },
    {
      id: 3,
      username: "Usuario 3",
      password: "password3",
      correoElectronico: "usuario3@example.com",
      tipoUsuario: "user",
    }
  ];
}