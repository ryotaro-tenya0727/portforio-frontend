import { useAuth0 } from '@auth0/auth0-react';
import HomeIcon from '@mui/icons-material/Home';

import { BreadCrumbs, Sidebar } from './../organisms/Organisms';
import home from './../../css/pages/home.module.css';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useContext } from 'react';

const Home = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const { setOpenMenu } = useContext(AuthGuardContext);

  const breadcrumbs = [
    {
      title: (
        <>
          <HomeIcon
            sx={{
              fontSize: '21px',
              mb: '-4.5px',
              mr: '2px',
              color: '#ff7bd7',
            }}
          />
          ホーム
        </>
      ),
      to: '/',
    },
  ];
  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <button style={{ cursor: 'pointer' }} onClick={() => setOpenMenu(true)}>
        メニュー
      </button>
      <br />
      {isLoading ? (
        '認証確認中'
      ) : (
        <>
          {' '}
          {isAuthenticated || (
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => loginWithRedirect()}
            >
              ログイン
            </button>
          )}
          {isAuthenticated && (
            <button style={{ cursor: 'pointer' }} onClick={() => logout()}>
              ログアウト
            </button>
          )}
        </>
      )}
      <div style={{ textAlign: 'center' }}>
        <img
          src={`${imageDomain}/admin/main-image.png`}
          alt='picture'
          width='800'
          className={home.main_image}
        />
      </div>
    </div>
  );
};

export default Home;
