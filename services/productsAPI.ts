import { API_URLS } from '@/services';
import { getUserToken } from '@/utils';

const getProducts = async () => {
  const response = await fetch(API_URLS.products);
  return response.json();
}

const createProduct = async (product: any) => {
  const response = await fetch(API_URLS.products, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(product),
  });
  return response.json();
}

export { getProducts, createProduct };