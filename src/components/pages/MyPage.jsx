import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { MyPageMenu } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const MyPage = () => {
  const { useGetAccesstokenAndCreateUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isLoading, isIdle } = useGetAccesstokenAndCreateUser();
  console.log('ユーザー');

  return (
    <div style={{ paddingBottom: '280px' }}>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      <h1>Mypage</h1>
      <Link to='/recommended-members/new'>推しメン登録ページへ</Link>
      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <MyPageMenu />

            <ReactQueryDevtools initialIsOpen={false} />
          </>
        )
      ) : (
        <>
          <p>{userData.data.attributes.name}さんログイン中</p>
          <MyPageMenu />

          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </div>
  );
};

export default MyPage;
