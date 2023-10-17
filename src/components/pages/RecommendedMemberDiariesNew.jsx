import { memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { BreadCrumbs, Headers } from './../organisms/Organisms';
import { DiaryNewForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberDiariesNew = memo(() => {
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { isAuthenticated, user, isAuthLoading } = useUsersApi();
  const breadcrumbs = [
    { title: 'マイページ', to: '/mypage' },
    {
      title: `${query.get('nickname')}の日記一覧`,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `日記作成ページ` },
  ];
  if (isAuthLoading) {
    return <Loading />;
  }
  if (isAuthenticated === false) {
    return <RedirectToLogin />;
  }
  return (
    <>
      {isAuthenticated && (
        <>
          <Headers name={user.name} />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <DiaryNewForm
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={`${query.get('nickname')}`}
            recommendedMemberGroup={`${query.get('group')}`}
          />
        </>
      )}
    </>
  );
});

export default RecommenedMemberDiariesNew;
