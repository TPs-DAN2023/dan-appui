export default function sessionMock(userIdType: number) {
  console.log("Cargando sesión");

  // Retrieve userTypes data from localStorage
  const userTypesData = JSON.parse(localStorage.getItem('mocks') || '[]').tiposUsuario;

  return {
    id: 1,
    userName: "jperez",
    password: "**********",
    token: "1234567890",
    tipoUsuario: userTypesData.find((tipo: any) => tipo.id === userIdType),
  }
}