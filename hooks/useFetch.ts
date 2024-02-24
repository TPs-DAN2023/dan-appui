import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

const useFetch = <T,>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: any): FetchState<T> => {
  const session = localStorage.getItem('session');
  const token = session ? JSON.parse(session).token : '';
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('useFetch', url, method, body);
    const fetchData = async () => {
      if (!url) return;
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        console.log('response', response);
        const data = await response.json();
        console.log('data', data);
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, token]);

  return { data, error, isLoading };
};

export default useFetch;