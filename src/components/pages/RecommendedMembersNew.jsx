import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';
import { useContext, useEffect } from 'react';

import { AuthGuardContext } from './../../providers/AuthGuard';
import { useUsersApi } from './../../hooks/useUsers';
import { RecommenedMembersNewForm } from './../organisms/Organisms';

const RecommenedMembersNew = () => {
  const queryClient = useQueryClient();
  const { useGetAccesstoken, useGetAccesstokenAndCreateUser } = useUsersApi();
  // useGetAccesstoken();

  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndCreateUser();

  // console.log(data);
  // const { useGetAccesstokenAndCreateUser } = useUsersApi();
  // const { data, isSuccess } = useGetAccesstokenAndCreateUser();
  // console.log(queryClient.getQueriesData('users'));

  return (
    <>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <h1>RecommenedMembersNew</h1>
            <ReactQueryDevtools initialIsOpen={false} />
            <Link to='/mypage'>マイページへ</Link>
            <p>{data.name}さんログイン中</p>
            <h1>推しメン登録</h1>
            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
          <h1>RecommenedMembersNew</h1>
          <ReactQueryDevtools initialIsOpen={false} />
          <Link to='/mypage'>マイページへ</Link>
          <p>{user_data.name}さんログイン中</p>
          <h1>推しメン登録</h1>
          <RecommenedMembersNewForm />
        </>
      )}
    </>
  );
};

export default RecommenedMembersNew;
