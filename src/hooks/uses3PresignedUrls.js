import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext, useCallback } from 'react';

import { s3PresignedUrlRepository } from './../repositories/s3PresignedUrlRepository';

export const useS3PresignedUrlsApi = () => {
  const { accessToken } = useContext(AuthGuardContext);
  const useGetS3PresignedUrl = async (params) => {
    return await s3PresignedUrlRepository.getPresignedUrl(
      params,
      accessToken || ''
    );
  };
  return { useGetS3PresignedUrl };
};
