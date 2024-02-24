import { API_URLS } from '@/services';

const getCategories = async () => {
  const response = await fetch(API_URLS.categories);
  return response.json();
}

export { getCategories };