import { useMutation, useQueryClient, useQuery } from 'react-query';
import { adminDiaryRepository } from '../repositories/adminDiaryRepository';
import { useContext } from 'react';

import { AuthGuardContext } from './../providers/AuthGuard';
export const useAdminDiariesApi = () => {
  const { accessToken } = useContext(AuthGuardContext);

  const useGetAdminDiaries = (userId) => {
    return useQuery({
      queryKey: ['admin_diaries', { userId: userId }],
      queryFn: () => adminDiaryRepository.getAdminDiary(accessToken, userId),
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };

  const useDeleteAdminDiary = (diaryId) => {
    const queryClient = useQueryClient();
    const queryKey = 'admin_diaries';

    const updater = (previousData) => {
      previousData.data = previousData.data.filter(
        (member) => member.id !== diaryId
      );
      return previousData;
    };

    return useMutation(
      async () => {
        return await adminDiaryRepository.deleteAdmindiary(
          accessToken || '',
          diaryId
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
          alert(`${diaryId}のユーザーを削除しました`);
        },
      }
    );
  };

  return { useGetAdminDiaries, useDeleteAdminDiary };
};
