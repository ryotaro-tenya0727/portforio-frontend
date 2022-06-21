import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMemberEditForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { HomeBreadText, Button } from './../atoms/atoms';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

import button from './../../css/atoms/button.module.css';

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

  const breadcrumbs = [
    {
      title: (
        <>
          <HomeBreadText />
        </>
      ),
      to: '/',
    },
    { title: 'マイページ', to: '/mypage' },
    {
      title: `${query.get('nickname')}の情報編集ページ`,
    },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
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
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMemberEditForm
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberId={recommended_member_id}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={
              query.get('group') === 'null' ? '' : query.get('group')
            }
          />
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button className={button.delete} onClick={deleteMember}>
              <BrokenImageIcon
                sx={{
                  fontSize: '20px',
                  mb: '-4.5px',
                  mr: '3px',
                }}
              />
              推しメンを削除
            </Button>
          </div>
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberEdit;
