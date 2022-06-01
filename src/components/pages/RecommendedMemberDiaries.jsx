import { useParams } from 'react-router-dom';

const RecommenedMembersDiaries = () => {
  let { recommended_member_uuid } = useParams();
  return (
    <>
      <div>推しメンの日記一覧 </div>
      <div>{recommended_member_uuid}</div>
    </>
  );
};

export default RecommenedMembersDiaries;
