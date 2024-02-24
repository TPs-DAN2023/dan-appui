import { API_URLS } from '@/services';

const getUsers = async () => {
  const response = await fetch(API_URLS.users);
  return response.json();
}

export { getUsers };