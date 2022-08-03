import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { HomeBreadText, MenuButton } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMemberEditForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { LoginName } from './../molecules/Molecules';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberEdit = () => {
  const { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

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
      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <LoginName name={data.name} />
            <MenuButton />
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMemberEditForm
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberId={recommended_member_id}
              recommendedMemberNickname={query.get('nickname')}
              recommendedMemberGroup={
                query.get('group') === 'null' ? '' : query.get('group')
              }
            />
          </>
        )
      ) : (
        <>
          <LoginName name={userData.name} />
          <MenuButton />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMemberEditForm
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberId={recommended_member_id}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={
              query.get('group') === 'null' ? '' : query.get('group')
            }
          />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberEdit;
