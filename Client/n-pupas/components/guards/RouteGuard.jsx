import { loginRoute, registerRoute } from 'routes/routes';
import useAuthContext from 'context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const RouteGuard = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const { role } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    authCheck(router.asPath);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  const authCheck = url => {
    const publicPaths = [loginRoute, registerRoute];
    const path = url.split('?')[0];

    if (!publicPaths.includes(path) && !role) {
      setAuthorized(false);
      router.push(loginRoute);
    } else {
      setAuthorized(true);
    }
  };

  return authorized && children;
};

export { RouteGuard };
