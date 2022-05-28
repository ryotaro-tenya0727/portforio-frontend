import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthGuardContext = createContext({});

export const AuthGuardProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getAccessToken = async () => {
    const token = await getAccessTokenSilently();
    setAccessToken(token);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken();
    }
  }, [isAuthenticated]);

  return (
    <AuthGuardContext.Provider value={{ accessToken }}>
      {children}
    </AuthGuardContext.Provider>
  );
};
