export default async function loginUserMock(user: string, password: string) {
  // Wait randomly between 1000 and 3000 ms for our 'request'
  const wait = Math.floor(Math.random() * 2001) + 1000;
  await new Promise((resolve) => setTimeout(resolve, wait));

  // Hardcoded failing example
  if (user === 'fail') {
    return { error: 'Login failed' };
  }

  return { success: true }
}