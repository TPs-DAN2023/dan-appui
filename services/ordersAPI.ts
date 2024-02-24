import { API_URLS } from '@/services';

const getOrders = async () => {
  const response = await fetch(API_URLS.orders);
  return response.json();
}

export { getOrders };