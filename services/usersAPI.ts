import { API_URLS } from '@/services';
import { getUserToken } from '@/utils';

const getUsers = async () => {
  const response = await fetch(API_URLS.users);
  return response.json();
}

const createUser = async (user: any) => {
  const response = await fetch(API_URLS.users, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export { getUsers, createUser };