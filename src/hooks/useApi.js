import { useMutation, useQueryClient } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext } from 'react';

export const useGenericMutation = (queryKey, fetcher, options) => {
  const { accessToken } = useContext(AuthGuardContext);
  const queryClient = useQueryClient();
  return useMutation(
    async (params) => {
      return await fetcher(params, accessToken || '');
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(queryKey, data);
      },
    },
    { ...options }
  );
};
