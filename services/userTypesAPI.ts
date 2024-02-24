import { API_URLS } from '@/services';
import { getUserToken } from '@/utils';

const getUserTypes = async () => {
  const response = await fetch(API_URLS.userTypes);
  return response.json();
}

const createUserType = async (userType: any) => {
  const response = await fetch(API_URLS.userTypes, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(userType),
  });
  return response.json();
}

export { getUserTypes, createUserType };