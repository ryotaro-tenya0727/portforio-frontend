import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { recommendedMembersRepository } from './../repositories/recommendedMemberRepository';

export const useRecommendedMembersApi = () => {
  const { accessToken } = useContext(AuthGuardContext);

  const useCreateRecommendedMember = () => {
    const queryClient = useQueryClient();
    const queryKey = 'recommended_members';

    const updater = (previousData, data) => {
      // const id = previousData.data[0].attributes.id + 1;
      previousData.data.unshift({
        attributes: {
          // id: id,
          nickname: data.recommended_member.nickname,
          group: data.recommended_member.group,
        },
      });
      return previousData;
    };

    return useMutation(
      async (params) => {
        return await recommendedMembersRepository.createRecommendedMember(
          params,
          accessToken || ''
        );
      },
      //mutateAsyncを開始したタイミングで実行
      {
        onMutate: async (data) => {
          await queryClient.cancelQueries(queryKey);
          const previousData = await queryClient.getQueryData(queryKey);
          if (previousData) {
            queryClient.setQueryData(queryKey, () => {
              // previousDataにdataを加える。
              return updater(previousData, data);
            });
          }
          return previousData;
        },
        onError: (err, _, context) => {
          // contextにはonMutateの戻り値が入る
          queryClient.setQueryData(queryKey, context);
          console.warn(err);
        },
        // すべての処理が終了した際にキャッシュを更新する
        // APIから取得成功した場合は仮のデータから取得したデータに更新
        // 失敗した場合は旧データに更新
        onSettled: () => {
          queryClient.invalidateQueries(queryKey);
          // console.log('更新');
        },
      }
    );
  };

  const useGetRecommendedMembers = () => {
    return useQuery({
      queryKey: 'recommended_members',
      queryFn: () =>
        recommendedMembersRepository.getRecommendedMembers(accessToken || ''),
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };

  return { useCreateRecommendedMember, useGetRecommendedMembers };
};
