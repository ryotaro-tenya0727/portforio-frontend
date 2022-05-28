import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext } from 'react';

import { userRepository } from '../repositories/userRepository';
import { useGenericMutation } from './useApi';

export const useUsersApi = () => {
  const { setAccessToken } = useContext(AuthGuardContext);
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
  return {
    useAddUser,
  };
};
