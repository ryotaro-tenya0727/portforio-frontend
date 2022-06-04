import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';
import { RecommenedMembersNewForm } from './../organisms/Organisms';

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
