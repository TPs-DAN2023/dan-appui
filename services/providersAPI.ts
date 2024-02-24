import { API_URLS } from '@/services';

const getProviders = async () => {
  const response = await fetch(API_URLS.providers);
  return response.json();
}

export { getProviders };