import { useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { AuthGuardContext } from '../providers/AuthGuard';
import { userRepository } from '../repositories/userRepository';
import { useState } from 'react';

export const useUsersApi = () => {
  const { setAccessToken } = useContext(AuthGuardContext);
  const {
    isAuthenticated,
    getAccessTokenSilently,
    user,
    isLoading: isAuthLoading,
  } = useAuth0();
  const [isLoading, setisLoading] = useState(true);
  const useAddUser = () => {
    const queryClient = useQueryClient();
    // mutateメソッドの引数がmutate関数の引数になる。下のcreateUser.mutate
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
          queryClient.setQueryData('users', data, {
            staleTime: Infinity,
            cacheTime: Infinity,
          });
        },
      }
    );
  };

  // const useGetAccesstokenAndCreateUser = async () => {
  // const createUser = useAddUser();
  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     (async () => {
  //       const token = await getAccessTokenSilently();
  //       try {
  //         createUser.mutate({
  //           value: { user: { name: user.name, user_image: user.picture } },
  //           accessToken: token,
  //         });
  //       } catch (error) {
  //         console.error(error.response.data);
  //       }
  //     })();
  //   }
  // }, [user]);
  // return createUser;
  //   const token = await getAccessTokenSilently();
  // };

  const useGetUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
      async (accessToken) => {
        setAccessToken(accessToken);
        return await userRepository.getUser(accessToken || '');
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData('users', data, {
            staleTime: Infinity,
            cacheTime: Infinity,
          });
        },
      }
    );
  };

  const useGetAccesstokenAndGetUser = () => {
    const getUser = useGetUser();

    useEffect(() => {
      if (isAuthenticated && user) {
        (async () => {
          const token = await getAccessTokenSilently();
          try {
            getUser.mutate(token);
          } catch (error) {
            console.error(error);
          }
        })();
      }
    }, [user]);
    return getUser;
  };

  return {
    isAuthenticated,
    // useGetAccesstokenAndCreateUser,
    // useGetAccesstokenAndGetUser,
    isAuthLoading,
    user,
  };
};
