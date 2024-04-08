import { useMutation, useQuery } from 'react-query';
import { profileRepository } from './../repositories/profileRepository.js';
import { usePrepareApiFunction } from './usefulFunction/prepareHooksApi';

export const useProfileApi = () => {
  const { navigate, getAccessTokenSilently, returnTop } =
    usePrepareApiFunction();

  const useGetProfile = () => {
    return useQuery({
      queryKey: 'profile',
      queryFn: async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await profileRepository.getProfile(accessToken);
        return response;
      },
      staleTime: 0,
      cacheTime: 0,
    });
  };

  const usePutProfile = () => {
    return useMutation(
      async (params) => {
        const accessToken = await getAccessTokenSilently();
        return await profileRepository.putProfile(params, accessToken);
      },
      {
        onSuccess: async () => {
          navigate('/mypage');
          returnTop();
        },
        onError: (err) => {
          console.warn(err);
        },
      }
    );
  };

  return {
    useGetProfile,
    usePutProfile,
  };
};
