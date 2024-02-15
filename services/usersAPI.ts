
export function getUsers() {
  return fetch("http://localhost/api/usuarios").then((res) => res.json());
}