import { useParams, useLocation, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMemberDiaryShowDetail } from './../templates/Templates';
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
    { title: 'ホーム', to: '/' },
    { title: 'マイページ', to: '/mypage' },
    {
      title: `${query.get('recommended_member_nickname')}の日記一覧`,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'recommended_member_nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `${query.get('recommended_member_nickname')}の日記詳細ページ` },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      <ReactQueryDevtools initialIsOpen={false} />

      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
          </>
        )
      ) : (
        <>
          <p> {userData.data.attributes.name}さんログイン中</p>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberDiaryShow;
