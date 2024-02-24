import { useState, useEffect } from 'react';

export default function useUser () {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setUserLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return { userLoggedIn, setUserLoggedIn, loading };
};
