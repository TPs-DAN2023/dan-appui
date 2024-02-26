export default function mockApiCall(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: any) {

  const mockLocalStorage = JSON.parse(localStorage.getItem('mocks') || '{}');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const resource = url.split('/')[url.split('/').length - 1]; // Assuming url is in the format '/resource'
      console.log('Resource: ', resource);
      let data = mockLocalStorage[resource] || [];

      switch (method) {
        case 'GET':
          resolve(data);
          break;
        case 'POST':
          data.push(body);
          localStorage.setItem(resource, JSON.stringify(data));
          resolve(body);
          break;
        case 'PUT':
          const index = data.findIndex((item: any) => item.id === body.id);
          if (index !== -1) {
            data[index] = body;
            localStorage.setItem(resource, JSON.stringify(data));
            resolve(body);
          } else {
            reject(new Error('Item not found'));
          }
          break;
        case 'DELETE':
          data = data.filter((item: any) => item.id !== body.id);
          localStorage.setItem(resource, JSON.stringify(data));
          resolve({ message: 'Item deleted' });
          break;
        default:
          reject(new Error('Invalid method'));
      }
    }, 300);
  });
}