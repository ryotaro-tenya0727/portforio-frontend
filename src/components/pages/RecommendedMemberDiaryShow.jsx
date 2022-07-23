import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { MenuButton, HomeBreadText } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import {
  RecommenedMemberDiaryShowDetail,
  Loading,
} from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberDiaryShow = () => {
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
      title: <>{`${query.get('recommended_member_nickname')}`}の日記一覧</>,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'recommended_member_nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `${query.get('recommended_member_nickname')}の日記詳細ページ` },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <MenuButton />
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
          </>
        )
      ) : (
        <>
          <p> {userData.name}さんログイン中</p>
          <MenuButton />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberDiaryShow;
