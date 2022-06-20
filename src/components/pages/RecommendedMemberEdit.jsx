import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { RecommenedMemberEditForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';

const RecommenedMemberEdit = () => {
  const navigate = useNavigate();
  const { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useDeleteRecommendedMember } = useRecommendedMembersApi();
  const deleteRecommendedMember = useDeleteRecommendedMember(
    recommended_member_id
  );
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  const deleteMember = () => {
    if (
      window.confirm(
        `本当に${query.get('nickname')}を削除しますか?${query.get(
          'nickname'
        )}との日記も削除されます.
      `
      )
    ) {
      deleteRecommendedMember.mutate();
      navigate('/mypage');
    }
  };

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      <Link to='/mypage'>マイページへ</Link>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <RecommenedMemberEditForm
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberId={recommended_member_id}
              recommendedMemberNickname={query.get('nickname')}
              recommendedMemberGroup={
                query.get('group') === 'null' ? '' : query.get('group')
              }
            />
            <button onClick={deleteMember}>推しメンを削除</button>
          </>
        )
      ) : (
        <>
          <p> {user_data.data.attributes.name}さんログイン中</p>
          <RecommenedMemberEditForm
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberId={recommended_member_id}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={
              query.get('group') === 'null' ? '' : query.get('group')
            }
          />
          <button onClick={deleteMember}>推しメンを削除</button>
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberEdit;
