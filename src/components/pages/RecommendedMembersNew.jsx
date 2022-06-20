import { Link } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMembersNewForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersNew = () => {
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  const breadcrumbs = [
    { title: 'ホーム', to: '/' },
    { title: 'マイページ', to: '/mypage' },
    { title: '推しメン登録', to: '/recommended-members/new' },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <br />
            <ReactQueryDevtools initialIsOpen={false} />

            <p>{data.data.attributes.name}さんログイン中</p>
            <BreadCrumbs breadcrumbs={breadcrumbs} />

            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
          <br />
          <ReactQueryDevtools initialIsOpen={false} />

          <p>{user_data.data.attributes.name}さんログイン中</p>
          <BreadCrumbs breadcrumbs={breadcrumbs} />

          <RecommenedMembersNewForm />
        </>
      )}
    </>
  );
};

export default RecommenedMembersNew;
