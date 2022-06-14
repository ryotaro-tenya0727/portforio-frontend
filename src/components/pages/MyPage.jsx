import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';
import { MyPageMenu } from './../templates/Templates';

const MyPage = () => {
  const { useGetAccesstokenAndCreateUser } = useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isLoading, isIdle } = useGetAccesstokenAndCreateUser();

  return (
    <div style={{ paddingBottom: '280px' }}>
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
