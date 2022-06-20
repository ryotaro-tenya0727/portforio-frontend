import { useParams, useLocation, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { RecommendedMemberDiariesList } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersDiaries = () => {
  const { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <Link to='/mypage'>マイページへ</Link>
            <br />
            <Link
              to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new?nickname=${query.get(
                'nickname'
              )}&group=${query.get('group')}`}
            >
              日記を追加する
            </Link>

            <RecommendedMemberDiariesList
              recommendedMemberId={recommended_member_id}
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberNickname={query.get('nickname')}
              recommendedMemberGroup={query.get('group')}
            />
          </>
        )
      ) : (
        <>
          <p> {userData.data.attributes.name}さんログイン中</p>
          <Link to='/mypage'>マイページへ</Link>
          <br />
          <Link
            to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new?nickname=${query.get(
              'nickname'
            )}&group=${query.get('group')}`}
          >
            日記を追加する
          </Link>

          <RecommendedMemberDiariesList
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={query.get('group')}
          />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMembersDiaries;
