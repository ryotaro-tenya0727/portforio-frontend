import { ReactQueryDevtools } from 'react-query/devtools';
import { useQueryClient } from 'react-query';

import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMembersNewForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';
import { HomeBreadText } from './../atoms/atoms';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const RecommenedMembersNew = () => {
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  const breadcrumbs = [
    {
      title: (
        <>
          <HomeBreadText />
        </>
      ),
      to: '/',
    },
    { title: 'マイページ', to: '/mypage' },
    {
      title: (
        <>
          {' '}
          <LoyaltyIcon
            sx={{
              fontSize: '19px',
              mb: '-4px',
              mr: '4px',
              color: '#ff6fc8',
            }}
          />
          推しメン登録ページ
        </>
      ),
      to: '/recommended-members/new',
    },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <ReactQueryDevtools initialIsOpen={false} />
            <p>{data.data.attributes.name}さんログイン中</p>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
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
