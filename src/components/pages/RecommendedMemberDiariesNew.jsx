import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { BreadCrumbs } from './../organisms/Organisms';
import { DiaryNewForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';
import { HomeBreadText } from './../atoms/atoms';

const RecommenedMemberDiariesNew = () => {
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
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
      title: `${query.get('nickname')}の日記一覧`,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `${query.get('nickname')}の日記作成ページ` },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
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
          <p> {user_data.data.attributes.name}さんログイン中</p>
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
};

export default RecommenedMemberDiariesNew;
