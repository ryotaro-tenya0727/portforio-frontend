import { memo } from 'react';
import { Link } from 'react-router-dom';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { Button, HomeBreadText } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import { MyPageMenu, Loading } from './../templates/Templates';
import { Headers } from './../organisms/Organisms';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

import button from './../../css/atoms/button.module.css';

const MyPage = memo(() => {
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
  ];

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  if (isAuthLoading) {
    return <Loading />;
  }
  if (isAuthenticated === false) {
    return <RedirectToLogin />;
  }
  return (
    isAuthenticated && (
      <div
        style={{
          paddingBottom: '280px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <Headers name={user.name} />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Link to='/recommended-members/new'>
            <Button
              className={button.recommended_and_diary_button}
              onClick={returnTop}
            >
              <LoyaltyIcon
                sx={{
                  fontSize: '18.5px',
                  mr: 0.5,
                  mb: '-3.5px',
                  color: '#ff6fc8',
                  '@media screen and (max-width:700px)': {
                    fontSize: '14.5px',
                    mr: 0.5,
                  },
                }}
              />
              推しメン登録ページへ
            </Button>
          </Link>
          <MyPageMenu user={user} />
        </div>
      </div>
    )
  );
});

export default MyPage;
