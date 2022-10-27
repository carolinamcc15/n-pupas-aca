import React, { useContext, createContext, useState, useMemo } from 'react';
import { getCookie, setCookies, removeCookies } from 'cookies-next';
import { branchCookie, roleCookie, tokenCookie } from 'constants/data';
import { adminRoutes, loginRoute } from 'routes/routes';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getCookie(tokenCookie));
  const [role, setRole] = useState(getCookie(roleCookie));
  const pupuseriaApi = new PupuseriaApi();
  const router = useRouter();

  const login = async credentials => {
    try {
      const loggedUser = await pupuseriaApi.login(credentials);

      if (loggedUser.token) {
        setToken(loggedUser.token);
        setRole(loggedUser.role);
        setCookies(tokenCookie, loggedUser.token);
        setCookies(roleCookie, loggedUser.role);

        router.push(adminRoutes.home);
      } else {
        toast.error('Credenciales inválidas');
      }
    } catch (e) {
      toast.error('Ocurrió un error');
    }
  };

  const logout = async () => {
    removeCookies(tokenCookie);
    removeCookies(roleCookie);
    removeCookies(branchCookie);

    router.push(loginRoute);
  };

  const values = useMemo(
    () => ({
      token,
      role,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('An error has occurred');
  }
  return context;
}

export default useAuthContext;
