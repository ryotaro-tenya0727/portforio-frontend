import { memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { HomeBreadText } from './../atoms/atoms';
import { BreadCrumbs, Headers } from './../organisms/Organisms';
import { RecommenedMemberEditForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberEdit = memo(() => {
  const { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { isAuthenticated, user, isAuthLoading } = useUsersApi();

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

  if (isAuthLoading) {
    return <Loading />;
  }
  if (isAuthenticated === false) {
    return <RedirectToLogin />;
  }

  return (
    isAuthenticated && (
      <>
        <Headers name={user.name} />
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
  );
});

export default RecommenedMemberEdit;
