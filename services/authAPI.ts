import { API_URLS } from '@/services';

const login = async (username: string, password: string) => {
  try {
    const response = await fetch(API_URLS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username, password: password }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (username: string, password: string, correoElectronico: string, typeUserId: number) => {
  try {
    const response = await fetch(API_URLS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userName: username, 
        password: password , 
        correoElectronico: correoElectronico, 
        tipoUsuario: { id: typeUserId } 
      }),
    });

    if (!response.ok) {
      throw new Error('Error registering');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    return { error: 'Error registering' };
  }
}

export { login, register };