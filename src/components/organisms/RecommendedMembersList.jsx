import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';

const RecommendedMembersList = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();
  const { data } = useGetRecommendedMembers();
  console.log(data);
  return <div>推しメン一覧</div>;
};

export default RecommendedMembersList;
