import { useQueryClient } from 'react-query';

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
  // console.log(recommendedMembers_data);
  return (
    <>
      <h2>推しメン一覧</h2>
      {recommendedMembers_data === undefined ? (
        isIdle || isLoading ? (
          <h2>推しメンローディング中</h2>
        ) : (
          recommendedMembers.data.map((recommendedMember) => {
            return (
              <p key={recommendedMember.attributes.nickname}>
                {recommendedMember.attributes.nickname}
              </p>
            );
          })
        )
      ) : (
        recommendedMembers_data.data.map((recommendedMember) => {
          return (
            <p key={recommendedMember.attributes.nickname}>
              {recommendedMember.attributes.nickname}
            </p>
          );
        })
      )}
    </>
  );
};

export default RecommendedMembersList;
