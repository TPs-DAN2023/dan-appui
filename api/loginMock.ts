export default async function loginUserMock(user: string, password: string) {
  // Wait randomly between 200 and 500 ms for our 'request'
  const wait = Math.floor(Math.random() * 300) + 200;
  await new Promise((resolve) => setTimeout(resolve, wait));

  // Hardcoded failing example
  if (user === 'fail') {
    return { error: 'Login failed' };
  }

  return { success: true }
}