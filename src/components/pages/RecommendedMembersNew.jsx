import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { useContext, useEffect } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersNew = () => {
  const queryClient = useQueryClient();
  // const user_data = queryClient.getQueriesData('users');
  // const { useGetAccesstokenAndCreateUser } = useUsersApi();
  // const { data, isSuccess } = useGetAccesstokenAndCreateUser();
  // console.log(queryClient.getQueriesData('users'));

  return (
    <>
      <h1>RecommenedMembersNew</h1>
      <ReactQueryDevtools initialIsOpen={false} />
      <Link to='/mypage'>マイページへ</Link>
    </>
  );
};

export default RecommenedMembersNew;
