import { createContext, useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthGuardContext = createContext({});

export const useAuthGuardContext = () => {
  useContext(AuthGuardContext);
};

export const AuthGuardProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  return (
    <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
  );
};
