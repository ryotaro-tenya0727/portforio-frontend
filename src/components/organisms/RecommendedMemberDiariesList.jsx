import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

const RecommendedMemberDiariesList = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const queryClient = useQueryClient();
  const { useGetRecommendedMemberDiaries } = useRecommendedMemberDiariesApi();
  const recommendedMemberDiaries_data = queryClient.getQueryData([
    'recommended_member_diaries',
    { recommendedMemberId: recommendedMemberId },
  ]);
  const {
    data: recommendedMemberDiaries,
    isIdle,
    isLoading,
  } = useGetRecommendedMemberDiaries(recommendedMemberId);
  // console.log(recommendedMemberDiaries);
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <h2>{recommendedMemberNickname}の日記一覧</h2>
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
                <br />
                <Link
                  to={`/recommended-member/${recommendedMemberUuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                >
                  日記詳細
                </Link>
                <br />
                <Link
                  to={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/edit/${diary.attributes.id}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                >
                  日記を編集
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
                  <br />
                  <Link
                    to={`/recommended-member/${recommendedMemberUuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  >
                    日記詳細
                  </Link>
                  <br />
                  <Link
                    to={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/edit/${diary.attributes.id}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  >
                    日記を編集
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
