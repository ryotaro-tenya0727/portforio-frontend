import { useMutation, useQueryClient } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { userRepository } from '../repositories/userRepository';

export const useUsersApi = () => {
  const { setAccessToken } = useContext(AuthGuardContext);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const useGetAccesstoken = () => {
    useEffect(() => {
      if (isAuthenticated && user) {
        (async () => {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        })();
      }
    }, [isAuthenticated, user]);
  };

  const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
      async (params) => {
        setAccessToken(params.accessToken);
        return await userRepository.createUser(
          params.value,
          params.accessToken || ''
        );
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData('users', data);
          // dataにAPIの戻り値入っている。
        },
      }
    );
  };

  const useGetAccesstokenAndCreateUser = () => {
    const createUser = useAddUser();
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
    return createUser;
  };
  return {
    useGetAccesstokenAndCreateUser,
    useGetAccesstoken,
  };
};
