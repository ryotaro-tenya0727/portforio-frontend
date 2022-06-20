import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { MyPageMenu } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';
import { BreadCrumbs } from './../organisms/Organisms';

const MyPage = () => {
  const { useGetAccesstokenAndCreateUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isLoading, isIdle } = useGetAccesstokenAndCreateUser();
  const breadcrumbs = [
    { title: 'ホーム', to: '/' },
    { title: 'マイページ', to: '/mypage' },
  ];

  return (
    <div style={{ paddingBottom: '280px' }}>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}

      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <br />
            <Link to='/recommended-members/new'>推しメン登録ページへ</Link>
            <MyPageMenu />

            <ReactQueryDevtools initialIsOpen={false} />
          </>
        )
      ) : (
        <>
          <p>{userData.data.attributes.name}さんログイン中</p>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <br />
          <Link to='/recommended-members/new'>推しメン登録ページへ</Link>
          <MyPageMenu />

          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </div>
  );
};

export default MyPage;
