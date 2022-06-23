import { createContext, useState } from 'react';

export const AuthGuardContext = createContext({});

export const AuthGuardProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isOpenMenu, setOpenMenu] = useState(false);

  return (
    <AuthGuardContext.Provider
      value={{ accessToken, setAccessToken, isOpenMenu, setOpenMenu }}
    >
      {children}
    </AuthGuardContext.Provider>
  );
};
