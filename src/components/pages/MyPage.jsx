import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { AuthGuardContext } from './../../providers/AuthGuard';
import { useUsersApi } from './../../hooks/useUsers';

const Mypage = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { useAddUser } = useUsersApi();
  const createUser = useAddUser();
  const { accessToken } = useContext(AuthGuardContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      (async () => {
        const token = await getAccessTokenSilently();
        try {
          createUser.mutate(
            {
              value: { user: { name: user.name, user_image: user.picture } },
              accessToken: token,
            },
            token
          );
        } catch (error) {
          console.error(error.response.data);
        }
      })();
    }
  }, [isAuthenticated, user]);
  return (
    <div>
      {/* {createUser.isSuccess && <p>succces</p>} */}
      <h1>Mypage</h1>
    </div>
  );
};

export default Mypage;
