import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

const RecommenedMemberDiaryShowDetail = ({ diaryId }) => {
  // console.log(diaryId);
  const { useShowRecommendedMemberDiary } = useRecommendedMemberDiariesApi();
  const queryClient = useQueryClient();
  let recommended_member_diary_show_data = queryClient.getQueryData([
    'recommended_member_diary_show',
    { diaryId: diaryId },
  ]);
  recommended_member_diary_show_data =
    recommended_member_diary_show_data &&
    recommended_member_diary_show_data.data.attributes;

  let {
    data: recommended_member_diary_show,
    isIdle,
    isLoading,
  } = useShowRecommendedMemberDiary(diaryId);
  // console.log(recommended_member_diary_show);

  return (
    <>
      <h1>日記詳細</h1>

      {recommended_member_diary_show_data === undefined ? (
        isIdle || isLoading ? (
          <h2>日記ローディング中</h2>
        ) : (
          <>
            {
              (recommended_member_diary_show =
                recommended_member_diary_show.data.attributes)
            }
            <p>{recommended_member_diary_show.impressive_memory}</p>
            <p>{recommended_member_diary_show.impressive_memory_detail}</p>
            <p>
              チェキ数 :{recommended_member_diary_show.event_polaroid_count}
            </p>
          </>
        )
      ) : (
        <>
          <p>{recommended_member_diary_show_data.impressive_memory}</p>
          <p>{recommended_member_diary_show_data.impressive_memory_detail}</p>
          <p>
            チェキ数 :{recommended_member_diary_show_data.event_polaroid_count}
          </p>
        </>
      )}
    </>
  );
};

export default RecommenedMemberDiaryShowDetail;
