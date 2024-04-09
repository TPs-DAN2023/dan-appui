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
    cliente: {
      id: 1,
      razonSocial: "Juan Perez",
      correoElectronico: "cliente1@prueba.com",
      cuit: "20-12345678-9",
      maximoCuentaCorriente: 5000,
      deuda: 0,
    }
  }
}