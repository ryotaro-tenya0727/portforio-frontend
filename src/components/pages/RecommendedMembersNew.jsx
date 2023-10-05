import { memo } from 'react';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { HomeBreadText } from './../atoms/atoms';
import { BreadCrumbs, Headers } from './../organisms/Organisms';
import { RecommenedMembersNewForm, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersNew = memo(() => {
  const { isAuthenticated, user, isAuthLoading } = useUsersApi();
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
  if (isAuthLoading) {
    return <Loading />;
  }
  if (isAuthenticated === false) {
    return <RedirectToLogin />;
  }
  return (
    isAuthenticated && (
      <>
        <Headers name={user.name} />
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        <RecommenedMembersNewForm />
      </>
    )
  );
});

export default RecommenedMembersNew;
