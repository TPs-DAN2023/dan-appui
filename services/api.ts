"use client"

import { mockApiCall } from '@/mocks';

// const session = localStorage.getItem('session');
const session = typeof window !== 'undefined' ? localStorage.getItem('session') : null;
const token = session ? JSON.parse(session).token : '';

// Get actual mode
const developMode =
  typeof window !== "undefined"
    ? localStorage.getItem("developMode") === "true"
    : false;
export const apiCall = async <T,>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: any): Promise<T> => {

  if (developMode) {
    console.log('Llamada con datos mockeados', url, method, body);
    // I have a mockAPI file that contains the mock data

    const mockData = await mockApiCall(url, method, body);

    console.log('Datos mockeados: ', mockData);
    return mockData as T;
  }
  try {
    console.log('Llamando a la API: ', url, method, body);
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      throw new Error(`Falló la llamada a la API: ${response.statusText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    console.log('Datos de la respuesta: ', data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default apiCall;