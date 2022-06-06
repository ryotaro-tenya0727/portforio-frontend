import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';
import { RecommenedMembersNewForm } from './../templates/Templates';

const RecommenedMembersNew = () => {
  const { useGetAccesstokenAndCreateUser } = useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndCreateUser();

  return (
    <>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <ReactQueryDevtools initialIsOpen={false} />
            <Link to='/mypage'>マイページへ</Link>
            <p>{data.name}さんログイン中</p>

            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
          <ReactQueryDevtools initialIsOpen={false} />
          <Link to='/mypage'>マイページへ</Link>
          <p>{user_data.name}さんログイン中</p>

          <RecommenedMembersNewForm />
        </>
      )}
    </>
  );
};

export default RecommenedMembersNew;
