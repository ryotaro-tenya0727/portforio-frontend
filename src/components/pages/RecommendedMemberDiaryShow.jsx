import { useParams, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RecommenedMemberDiaryShowDetail } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMemberDiaryShow = () => {
  const { diary_id } = useParams();
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      <ReactQueryDevtools initialIsOpen={false} />
      <Link to='/mypage'>マイページへ</Link>

      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
          </>
        )
      ) : (
        <>
          <p> {userData.data.attributes.name}さんログイン中</p>
          <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberDiaryShow;
