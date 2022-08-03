import { useQueryClient } from 'react-query';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { HomeBreadText, MenuButton } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMembersNewForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { LoginName } from './../molecules/Molecules';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersNew = () => {
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
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
      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <LoginName name={data.name} />
            <MenuButton />
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMembersNewForm />
          </>
        )
      ) : (
        <>
          <LoginName name={userData.name} />
          <MenuButton />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMembersNewForm />
        </>
      )}
    </>
  );
};

export default RecommenedMembersNew;
