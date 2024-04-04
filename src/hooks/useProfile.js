import { useMutation, useQuery } from 'react-query';
import { profileRepository } from './../repositories/profileRepository.js';
import { usePrepareApiFunction } from './usefulFunction/prepareHooksApi';

export const useProfileApi = () => {
  const { navigate, getAccessTokenSilently, returnTop } =
    usePrepareApiFunction();

  const usePutProfile = () => {
    return useMutation(
      async (params) => {
        const accessToken = await getAccessTokenSilently();
        return await profileRepository.putProfile(params, accessToken || '');
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
    usePutProfile,
  };
};
