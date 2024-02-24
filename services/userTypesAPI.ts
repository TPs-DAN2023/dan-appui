import { API_URLS } from '@/services';

const getUserTypes = async () => {
  const response = await fetch(API_URLS.userTypes);
  return response.json();
}

export { getUserTypes };