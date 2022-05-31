import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { recommendedMembersRepository } from './../repositories/recommendedMemberRepository';

export const useRecommendedMembersApi = () => {
  const { accessToken } = useContext(AuthGuardContext);
  const useCreateRecommendedMember = () => {
    // const queryClient = useQueryClient();
    return useMutation(async (params) => {
      return await recommendedMembersRepository.createRecommendedMember(
        params,
        accessToken || ''
      );
    });
  };

  const useGetRecommendedMembers = () => {
    return useQuery({
      queryKey: 'recommended_members',
      queryFn: () =>
        recommendedMembersRepository.getRecommendedMembers(accessToken || ''),
      staleTime: 3000000,
    });
  };

  return { useCreateRecommendedMember, useGetRecommendedMembers };
};
