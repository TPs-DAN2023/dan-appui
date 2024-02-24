import { API_URLS } from '@/services';
import { getUserToken } from '@/utils';

const getProviders = async () => {
  const response = await fetch(API_URLS.providers);
  return response.json();
}

const createProvider = async (provider: any) => {
  const response = await fetch(API_URLS.providers, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(provider),
  });
  return response.json();
}

export { getProviders, createProvider };