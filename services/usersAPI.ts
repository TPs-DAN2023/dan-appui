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

const updateUser = async (user: any) => {
  const response = await fetch(`${API_URLS.users}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

const deleteUser = async (id: string | undefined) => {
  const response = await fetch(`${API_URLS.users}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
  return response.json();
}

export { getUsers, createUser, updateUser, deleteUser };