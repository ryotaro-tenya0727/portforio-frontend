import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const usePrepareApiFunction = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    navigate,
    getAccessTokenSilently,
    returnTop,
  };
};
