import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import HelpIcon from '@mui/icons-material/Help';
import LoadingButton from '@mui/lab/LoadingButton';

import home from './../../css/pages/home.module.css';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useContext } from 'react';

const Home = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const { isOpenMenu, setOpenMenu } = useContext(AuthGuardContext);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div className={home.home}>
      <div className={home.buttons}>
        <button
          style={{ cursor: 'pointer', float: 'right' }}
          onClick={() => setOpenMenu(true)}
          className={`${home.menu_button} ${isOpenMenu ? home.active : ''}`}
        >
          <div class='openbtn-area'>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p style={{ marginTop: '34px', color: 'white' }}>Menu</p>
        </button>
        <br />
        {isLoading ? (
          <button className={home.login_button}>
            <CircularProgress sx={{ color: '#ff94df' }} />
          </button>
        ) : (
          <>
            {' '}
            {isAuthenticated ||
              (loading ? (
                <button className={home.login_button}>
                  <CircularProgress sx={{ color: '#ff94df' }} />
                </button>
              ) : (
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleClick();
                    loginWithRedirect();
                  }}
                  className={home.login_button}
                >
                  <LoginIcon sx={{ color: '#ff94df' }} />
                  <p style={{ fontSize: '10px' }}>ログイン</p>
                </button>
              ))}
            {isAuthenticated &&
              (loading ? (
                <button className={home.login_button}>
                  <CircularProgress sx={{ color: '#ff94df' }} />
                </button>
              ) : (
                <button
                  className={home.login_button}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleClick();
                    logout();
                  }}
                >
                  <LogoutIcon sx={{ color: '#ff94df' }} />
                  <p style={{ fontSize: '10px' }}>ログアウト</p>
                </button>
              ))}
            <br />
          </>
        )}
        <Link to='#' style={{ margin: '0 auto' }} className={home.about}>
          <HelpIcon sx={{ color: '#ff94df', fontSize: '30px' }} />
          <br />
          <span
            style={{
              margin: '10px 0px 0px 3px',
              color: '#fff',
              fontWeight: 'bold',
              writingMode: 'vertical-rl',
            }}
          >
            ABOUT&emsp;推し♡だいありー
          </span>
        </Link>
      </div>
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
