import { API_URLS } from '@/services';

const getProducts = async () => {
  const response = await fetch(API_URLS.products);
  return response.json();
}

export { getProducts };