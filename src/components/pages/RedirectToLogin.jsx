import { useAuth0 } from '@auth0/auth0-react';

const RedirectToLogin = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

export default RedirectToLogin;
