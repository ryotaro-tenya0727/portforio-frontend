import { useQuery } from 'react-query';
import { generalDiaryRepository } from './../repositories/generalDiaryRepository';

export const useGeneralDiariesApi = () => {
  const useGetGeneralDiaries = () => {
    return useQuery({
      queryKey: 'recommended_members',
      queryFn: () => generalDiaryRepository.getGeneralDiary(),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };
  return { useGetGeneralDiaries };
};
