import { useContext } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import { AuthGuardContext } from './../providers/AuthGuard';
import { adminUserRepository } from './../repositories/adminUserRepository';

export const useAdminUsersApi = () => {
  const { accessToken } = useContext(AuthGuardContext);

  const useGetAdminUsers = () => {
    return useQuery({
      queryKey: 'admin_users',
      queryFn: () => adminUserRepository.getAdminUser(accessToken),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  const useDeleteAdminUser = (userId) => {
    const queryClient = useQueryClient();
    const queryKey = 'admin_users';

    const updater = (previousData) => {
      previousData.data = previousData.data.filter(
        (member) => member.id !== userId
      );
      return previousData;
    };

    return useMutation(
      async () => {
        return await adminUserRepository.deleteAdminUser(
          accessToken || '',
          userId
        );
      },
      {
        onMutate: async () => {
          await queryClient.cancelQueries(queryKey);
          const previousData = await queryClient.getQueryData(queryKey);
          if (previousData) {
            queryClient.setQueryData(queryKey, () => {
              return updater(previousData);
            });
          }
          return previousData;
        },
        onError: (err, _, context) => {
          queryClient.setQueryData(queryKey, context);
          console.warn(err);
        },
        onSettled: () => {
          queryClient.invalidateQueries(queryKey);
          alert(`${userId}のユーザーを削除しました`);
        },
      }
    );
  };

  return { useGetAdminUsers, useDeleteAdminUser };
};
