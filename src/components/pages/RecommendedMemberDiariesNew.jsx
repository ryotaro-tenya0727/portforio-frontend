import { memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { BreadCrumbs, Headers } from './../organisms/Organisms';
import { DiaryNewForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberDiariesNew = memo(() => {
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
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

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <Headers name={data.name} />
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <DiaryNewForm
              recommendedMemberId={recommended_member_id}
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberNickname={`${query.get('nickname')}`}
              recommendedMemberGroup={`${query.get('group')}`}
            />
          </>
        )
      ) : (
        <>
          <Headers name={userData.name} />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <DiaryNewForm
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={`${query.get('nickname')}`}
            recommendedMemberGroup={`${query.get('group')}`}
          />
        </>
      )}
      <br />
    </>
  );
});

export default RecommenedMemberDiariesNew;
