import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { RecommenedMemberEditForm } from './../organisms/Organisms';

const RecommenedMemberEdit = () => {
  const { recommended_member_uuid, recommended_member_id } = useParams();
  const { useGetAccesstokenAndGetUser } = useUsersApi();
  const { useDeleteRecommendedMember } = useRecommendedMembersApi();
  const deleteRecommendedMember = useDeleteRecommendedMember(
    recommended_member_id
  );

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  const navigate = useNavigate();

  const deleteMember = () => {
    alert(
      `本当に${query.get('nickname')}を削除しますか?${query.get(
        'nickname'
      )}との日記も削除されます.
      `
    );
    deleteRecommendedMember.mutate();
    navigate('/mypage');
  };

  const putMember = (data) => {};

  return (
    <>
      <h1>
        推しメン{`${query.get('nickname')}`}: {`${query.get('group')}`}
        :を編集中
      </h1>
      <Link to='/mypage'>マイページへ</Link>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <button onClick={deleteMember}>推しメンを削除</button>
            <RecommenedMemberEditForm
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberId={recommended_member_id}
            />
          </>
        )
      ) : (
        <>
          <p> {user_data.name}さんログイン中</p>
          <button onClick={deleteMember}>推しメンを削除</button>
          <RecommenedMemberEditForm
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberId={recommended_member_id}
          />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberEdit;
