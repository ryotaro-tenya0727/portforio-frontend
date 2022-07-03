import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { Button, HomeBreadText, MenuButton } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import { MyPageMenu, Loading } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

import button from './../../css/atoms/button.module.css';

const MyPage = () => {
  const { useGetAccesstokenAndCreateUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndCreateUser();
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
  return (
    <div style={{ paddingBottom: '280px' }}>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}

      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <MenuButton />
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
                    '@media screen and (max-width:600px)': {
                      fontSize: '14.5px',
                      mr: 0.5,
                    },
                  }}
                />
                推しメン登録ページへ
              </Button>
            </Link>
            <MyPageMenu />
          </>
        )
      ) : (
        <>
          <p>{userData.name}さんログイン中</p>
          <MenuButton />
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
                  '@media screen and (max-width:600px)': {
                    fontSize: '14.5px',
                    mr: 0.5,
                  },
                }}
              />
              推しメン登録ページへ
            </Button>
          </Link>
          <MyPageMenu />
        </>
      )}
    </div>
  );
};

export default MyPage;
