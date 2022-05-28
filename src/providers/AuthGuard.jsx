import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUsersApi } from './../hooks/useUsers';

export const AuthGuardContext = createContext({});

export const AuthGuardProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthGuardContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthGuardContext.Provider>
  );
};
