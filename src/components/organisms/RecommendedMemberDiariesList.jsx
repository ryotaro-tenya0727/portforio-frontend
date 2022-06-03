import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

const RecommendedMemberDiariesList = ({
  recommended_member_id,
  recommended_member_nickname,
  recommended_member_uuid,
}) => {
  const queryClient = useQueryClient();
  const { useGetRecommendedMemberDiaries } = useRecommendedMemberDiariesApi();
  const recommendedMemberDiaries_data = queryClient.getQueryData([
    'recommended_member_diaries',
    { recommendedMemberId: recommended_member_id },
  ]);
  const {
    data: recommendedMemberDiaries,
    isIdle,
    isLoading,
  } = useGetRecommendedMemberDiaries(recommended_member_id);
  // console.log(recommendedMemberDiaries);
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <h2>{recommended_member_nickname}の日記一覧</h2>
      {recommendedMemberDiaries_data === undefined ? (
        isIdle || isLoading ? (
          <h2>日記ローディング中</h2>
        ) : (
          recommendedMemberDiaries.data.map((diary, index) => {
            return (
              <p key={index}>
                {diary.attributes.diary_member_nickname}
                <br />
                {diary.attributes.event_name}:{diary.attributes.event_venue}
                <Link
                  to={`/recommended-member/${recommended_member_uuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommended_member_nickname}`}
                >
                  日記詳細
                </Link>
              </p>
            );
          })
        )
      ) : (
        recommendedMemberDiaries_data.data.map((diary, index) => {
          return (
            <div key={index}>
              {diary.attributes.uuid === undefined ? (
                <h1>作成中</h1>
              ) : (
                <>
                  {' '}
                  {diary.attributes.event_name}:{diary.attributes.event_venue}
                  <Link
                    to={`/recommended-member/${recommended_member_uuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommended_member_nickname}`}
                  >
                    日記詳細
                  </Link>
                </>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default RecommendedMemberDiariesList;
