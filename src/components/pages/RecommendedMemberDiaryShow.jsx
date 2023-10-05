import { memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { BreadCrumbs, Headers } from './../organisms/Organisms';
import {
  RecommenedMemberDiaryShowDetail,
  Loading,
} from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberDiaryShow = memo(() => {
  const { recommended_member_uuid, recommended_member_id, diary_id } =
    useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const { isAuthenticated, user, isAuthLoading } = useUsersApi();

  const breadcrumbs = [
    { title: 'マイページ', to: '/mypage' },
    {
      title: <>{`${query.get('recommended_member_nickname')}`}の日記一覧</>,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'recommended_member_nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `日記詳細ページ` },
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
          <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
        </>
      )}
      <br />
    </>
  );
});

export default RecommenedMemberDiaryShow;
