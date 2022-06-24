import { useGeneralDiariesApi } from '../../hooks/useGeneralDiary';

const GeneralDiaryList = () => {
  const { useGetGeneralDiaries } = useGeneralDiariesApi();
  const { data: generalDiaries, isLoading, isIdle } = useGetGeneralDiaries();
  console.log(generalDiaries);
  return <>一般日記</>;
};

export default GeneralDiaryList;
