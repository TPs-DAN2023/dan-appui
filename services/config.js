export const API_BASE_URL = 'http://localhost/api';

export const API_URLS = {
  categories: `${API_BASE_URL}/categorias`,
  login: `${API_BASE_URL}/auth/login`,
  // logout: `${API_BASE_URL}/logout`, // TODO: See if it's worth implementing
  orders: `${API_BASE_URL}/pedidos`,
  products: `${API_BASE_URL}/productos`,
  providers: `${API_BASE_URL}/proveedores`,
  register: `${API_BASE_URL}/auth/register`,
  users: `${API_BASE_URL}/usuarios`,
  userTypes: `${API_BASE_URL}/tipos-usuario`,
  validateToken: `${API_BASE_URL}/auth/validate`,
};

export default API_URLS;