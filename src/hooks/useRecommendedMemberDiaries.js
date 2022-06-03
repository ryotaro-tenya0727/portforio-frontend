import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { recommendedMemberDiaryRepository } from './../repositories/recommendedMemberDiaryRepository';

export const useRecommendedMemberDiariesApi = () => {
  const { accessToken } = useContext(AuthGuardContext);

  const useGetRecommendedMemberDiaries = (recommendedMemberId) => {
    return useQuery({
      queryKey: [
        'recommended_member_diaries',
        { recommendedMemberId: recommendedMemberId },
      ],
      queryFn: () =>
        recommendedMemberDiaryRepository.getRecommendedMemberDiary(
          recommendedMemberId,
          accessToken || ''
        ),
      enabled: !!recommendedMemberId,
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };

  const useCreateRecommendedMemberDiaries = (recommendedMemberId) => {
    const queryClient = useQueryClient();
    const queryKey = [
      'recommended_member_diaries',
      { recommendedMemberId: recommendedMemberId },
    ];

    const updater = (previousData, data) => {
      previousData.data.unshift({
        attributes: data.diary,
      });
      return previousData;
    };

    return useMutation(
      async (params) => {
        return await recommendedMemberDiaryRepository.createRecommendedMemberDiary(
          params,
          recommendedMemberId,
          accessToken || ''
        );
      },
      //mutateAsyncを開始したタイミングで実行
      // dataはmutatecに渡した引数
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
        },
      }
    );
  };

  const useGetRecommendedMemberDiaryShow = (diaryId) => {
    return useQuery({
      queryKey: ['recommended_member_diary_show', { diaryId: diaryId }],
      queryFn: () =>
        recommendedMemberDiaryRepository.getRecommendedMemberDiaryShow(
          diaryId,
          accessToken || ''
        ),
      enabled: !!diaryId,
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };

  return {
    useGetRecommendedMemberDiaries,
    useCreateRecommendedMemberDiaries,
    useGetRecommendedMemberDiaryShow,
  };
};
