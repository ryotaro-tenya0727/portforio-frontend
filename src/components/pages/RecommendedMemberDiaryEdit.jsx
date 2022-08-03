import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { HomeBreadText, MenuButton } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import {
  RecommenedMemberDiaryEditForm,
  Loading,
} from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { LoginName } from './../molecules/Molecules';
import { useUsersApi } from './../../hooks/useUsers';

const RecommendedMemberDiaryEdit = () => {
  const { recommended_member_uuid, recommended_member_id, diary_id } =
    useParams();
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
      title: <>{`${query.get('nickname')}`}の日記一覧</>,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `${query.get('nickname')}の日記編集ページ` },
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
            <RecommenedMemberDiaryEditForm
              recommendedMemberId={recommended_member_id}
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberNickname={query.get('nickname')}
              recommendedMemberGroup={query.get('group')}
              diaryId={diary_id}
            />
          </>
        )
      ) : (
        <>
          <LoginName name={userData.name} />
          <MenuButton />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMemberDiaryEditForm
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={query.get('group')}
            diaryId={diary_id}
          />
        </>
      )}
    </>
  );
};

export default RecommendedMemberDiaryEdit;
