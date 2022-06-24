import { useGeneralDiariesApi } from '../../hooks/useGeneralDiary';

const GeneralDiaryList = () => {
  const { useGetGeneralDiaries } = useGeneralDiariesApi();
  const { data: generalDiaries, isLoading, isIdle } = useGetGeneralDiaries();

  return isIdle || isLoading ? <>ローディング</> : <>日記取得完了</>;
};

export default GeneralDiaryList;
