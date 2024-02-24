import { API_URLS } from '@/services';
import { getUserToken } from '@/utils';

const getOrders = async () => {
  const response = await fetch(API_URLS.orders);
  return response.json();
}

const createOrder = async (order: any) => {
  const response = await fetch(API_URLS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(order),
  });
  return response.json();
}

export { getOrders, createOrder };