import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { userRepository } from '../repositories/userRepository';

export const useUsersApi = () => {
  const { setAccessToken, accessToken } = useContext(AuthGuardContext);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const useAddUser = () => {
    const queryClient = useQueryClient();
    // mutateメソッドの引数がmutate関数の引数になる。
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
    }, [user]);
    return createUser;
  };

  const useGetAccesstoken = () => {
    useEffect(() => {
      (async () => {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      })();
    }, []);
  };

  const useGetUser = async () => {
    return useQuery({
      queryKey: 'users',
      queryFn: () => userRepository.getUser(accessToken || ''),
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };
  return {
    useGetAccesstokenAndCreateUser,
    useGetAccesstoken,
    useGetUser,
  };
};
