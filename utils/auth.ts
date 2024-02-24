export function hasUserType(userType: string): boolean {
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  return Object.keys(session).length > 0 && session.tipoUsuario.tipo === userType;
}

export function getUserToken(): string {
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  return Object.keys(session).length > 0 ? session.token : "";
}