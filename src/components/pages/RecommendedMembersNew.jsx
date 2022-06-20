import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { RecommenedMembersNewForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersNew = () => {
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <ReactQueryDevtools initialIsOpen={false} />
            <Link to='/mypage'>マイページへ</Link>
            <p>{data.data.attributes.name}さんログイン中</p>

            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
          <ReactQueryDevtools initialIsOpen={false} />
          <Link to='/mypage'>マイページへ</Link>
          <p>{user_data.data.attributes.name}さんログイン中</p>

          <RecommenedMembersNewForm />
        </>
      )}
    </>
  );
};

export default RecommenedMembersNew;
