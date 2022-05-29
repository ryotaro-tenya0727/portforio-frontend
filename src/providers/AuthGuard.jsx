import { createContext, useState } from 'react';

export const AuthGuardContext = createContext({});

export const AuthGuardProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthGuardContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthGuardContext.Provider>
  );
};
