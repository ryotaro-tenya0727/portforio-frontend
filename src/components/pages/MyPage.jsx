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
    <>
      <h1>Mypage</h1>
      <Link to='/recommended-members/new'>推しメン登録ページへ</Link>
      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <MyPageMenu userData={data.data.attributes.name} />

            <ReactQueryDevtools initialIsOpen={false} />
          </>
        )
      ) : (
        <>
          <p>{userData.data.attributes.name}さんログイン中</p>
          <MyPageMenu userData={userData.data.attributes} />

          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </>
  );
};

export default MyPage;
