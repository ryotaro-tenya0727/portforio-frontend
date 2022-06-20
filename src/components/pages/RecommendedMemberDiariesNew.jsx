import { useParams, useLocation, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { DiaryNewForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberDiariesNew = () => {
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      <Link to='/mypage'>マイページへ</Link>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>

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
