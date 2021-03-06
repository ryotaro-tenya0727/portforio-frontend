import { useQueryClient } from 'react-query';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { HomeBreadText, MenuButton } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMembersNewForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

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
          <Loading />
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <MenuButton />
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
          <p>{user_data.name}さんログイン中</p>
          <MenuButton />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMembersNewForm />
        </>
      )}
    </>
  );
};

export default RecommenedMembersNew;
