import { useQuery } from 'react-query';
import { generalDiaryRepository } from './../repositories/generalDiaryRepository';

export const useGeneralDiariesApi = () => {
  const useGetGeneralDiaries = () => {
    return useQuery({
      queryKey: 'general_diaries',
      queryFn: () => generalDiaryRepository.getGeneralDiary(),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  const useShowGeneralDiaries = (diaryId) => {
    return useQuery({
      queryKey: ['general_diary_show', { diaryId: diaryId }],
      queryFn: () => generalDiaryRepository.showGeneralDiary(diaryId),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };
  return { useGetGeneralDiaries, useShowGeneralDiaries };
};
