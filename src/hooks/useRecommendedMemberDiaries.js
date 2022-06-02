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

  const useCreateRecommendedMemberDiaries = () => {
    const queryClient = useQueryClient();
    const queryKey = 'recommended_member_diaries';
  };

  return {
    useGetRecommendedMemberDiaries,
    useCreateRecommendedMemberDiaries,
  };
};
