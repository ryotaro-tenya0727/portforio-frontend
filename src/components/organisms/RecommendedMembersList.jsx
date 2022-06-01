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
    isSuccess,
  } = useGetRecommendedMembers();
  console.log(recommendedMembers_data);
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
                {recommendedMember.attributes.nickname}
                <Link
                  to={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                >
                  日記一覧を表示または追加へ
                </Link>
              </p>
            );
          })
        )
      ) : (
        recommendedMembers_data.data.map((recommendedMember, index) => {
          return (
            <p key={index}>
              {recommendedMember.attributes.nickname}
              {recommendedMember.attributes.uuid === undefined || (
                <Link
                  to={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                >
                  日記一覧を表示または追加へ
                </Link>
              )}
            </p>
          );
        })
      )}
    </>
  );
};

export default RecommendedMembersList;
