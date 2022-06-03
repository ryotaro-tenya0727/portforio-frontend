import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { recommendedMemberRepository } from './../repositories/recommendedMemberRepository';

export const useRecommendedMembersApi = () => {
  const { accessToken } = useContext(AuthGuardContext);

  const useGetRecommendedMembers = () => {
    return useQuery({
      queryKey: 'recommended_members',
      queryFn: () =>
        recommendedMemberRepository.getRecommendedMember(accessToken || ''),
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };

  const useCreateRecommendedMembers = () => {
    const queryClient = useQueryClient();
    const queryKey = 'recommended_members';

    const updater = (previousData, data) => {
      previousData.data.unshift({
        attributes: data.recommended_member,
      });
      return previousData;
    };

    return useMutation(
      async (params) => {
        return await recommendedMemberRepository.createRecommendedMember(
          params,
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

  const usePutRecommendedMember = (recommendedMemberId) => {
    const queryClient = useQueryClient();
    const queryKey = 'recommended_members';

    const updater = (previousData, params) => {
      previousData.data = previousData.data.map((member) => {
        if (member.id === recommendedMemberId) {
          return {
            attributes: { ...member.attributes, ...params.recommended_member },
          };
        } else {
          return member;
        }
      });
      console.log(previousData);
      return previousData;
    };

    return useMutation(
      async (params) => {
        return await recommendedMemberRepository.putRecommendedMember(
          params,
          recommendedMemberId,
          accessToken || ''
        );
      },
      //mutateAsyncを開始したタイミングで実行
      // dataはmutatecに渡した引数
      {
        onMutate: async (params) => {
          await queryClient.cancelQueries(queryKey);
          const previousData = await queryClient.getQueryData(queryKey);
          if (previousData) {
            queryClient.setQueryData(queryKey, () => {
              return updater(previousData, params);
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

  const useDeleteRecommendedMember = (recommendedMemberId) => {
    const queryClient = useQueryClient();
    const queryKey = 'recommended_members';

    const updater = (previousData) => {
      previousData.data = previousData.data.filter(
        (member) => member.id !== recommendedMemberId
      );
      return previousData;
    };

    return useMutation(
      async () => {
        return await recommendedMemberRepository.deleteRecommendedMember(
          recommendedMemberId,
          accessToken || ''
        );
      },
      //mutateAsyncを開始したタイミングで実行
      // dataはmutatecに渡した引数
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

  const useShowRecommendedMembers = (recommendedMemberId) => {
    return useQuery({
      queryKey: [
        'recommended_member_show',
        { recommendedMemberId: recommendedMemberId },
      ],
      queryFn: () =>
        recommendedMemberRepository.showRecommendedMember(
          recommendedMemberId,
          accessToken || ''
        ),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  return {
    useCreateRecommendedMembers,
    useGetRecommendedMembers,
    useDeleteRecommendedMember,
    usePutRecommendedMember,
    useShowRecommendedMembers,
  };
};
