import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';

const RecommendedMembersList = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();
  const queryClient = useQueryClient();
  const recommendedMembers_data = queryClient.getQueryData(
    'recommended_members'
  );

  const {
    data: recommendedMembers,
    isLoading,
    isIdle,
  } = useGetRecommendedMembers();

  return (
    <>
      <h2>推しメン一覧</h2>
      {recommendedMembers_data === undefined ? (
        isIdle || isLoading ? (
          <h2>推しメンローディング中</h2>
        ) : (
          recommendedMembers.data.map((recommendedMember, index) => {
            return (
              <p key={index}>
                {(recommendedMember = recommendedMember.attributes)}
                {recommendedMember.nickname}:{recommendedMember.group}
                <br />
                <Link
                  to={`/recommended-member/${recommendedMember.uuid}/diaries/${recommendedMember.id}?nickname=${recommendedMember.nickname}&group=${recommendedMember.group}`}
                >
                  日記一覧を表示または追加へ
                </Link>
                <br />
                <Link
                  to={`/recommended-member/${recommendedMember.uuid}/edit/${recommendedMember.id}?nickname=${recommendedMember.nickname}&group=${recommendedMember.group}`}
                >
                  推しメンの情報を編集
                </Link>
              </p>
            );
          })
        )
      ) : (
        recommendedMembers_data.data.map((recommendedMember, index) => {
          return (
            <p key={index}>
              {recommendedMember.attributes.nickname}:
              {recommendedMember.attributes.group}
              <br />
              {recommendedMember.attributes.uuid === undefined ? (
                <h2>推しメン作成中</h2>
              ) : (
                <>
                  <Link
                    to={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                  >
                    日記一覧を表示または追加へ
                  </Link>
                  <br />
                  <Link
                    to={`/recommended-member/${recommendedMember.attributes.uuid}/edit/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                  >
                    推しメンの情報を編集
                  </Link>
                </>
              )}
            </p>
          );
        })
      )}
    </>
  );
};

export default RecommendedMembersList;
