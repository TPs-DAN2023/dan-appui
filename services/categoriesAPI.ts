import { API_URLS } from '@/services';
import { getUserToken } from '@/utils';

const getCategories = async () => {
  const response = await fetch(API_URLS.categories);
  return response.json();
}

const createCategory = async (category: any) => {
  const response = await fetch(API_URLS.categories, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(category),
  });
  return response.json();
}

export { getCategories, createCategory };