import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import HelpIcon from '@mui/icons-material/Help';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { Button, MenuButton } from './../atoms/atoms';
import home from './../../css/pages/home.module.css';

const Home = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFF4F6',

        margin: '0 auto',
        marginTop: '-2.5px',
        borderRadius: '5px',
      }}
    >
      <div className={home.home}>
        <div className={home.buttons}>
          <MenuButton />
          <br />
          {isLoading ? (
            <button className={home.login_button}>
              <CircularProgress sx={{ color: '#ff94df' }} />
            </button>
          ) : (
            <>
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
                  <>
                    <button className={home.login_button}>
                      <CircularProgress sx={{ color: '#ff94df' }} />
                    </button>
                  </>
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
            </>
          )}
          <Link to='#' style={{ margin: '0 auto' }} className={home.about}>
            <HelpIcon sx={{ color: '#ff94df', fontSize: '30px' }} />
            <br />
            <span
              style={{
                color: '#fff',
                fontWeight: 'bold',
                writingMode: 'vertical-rl',
              }}
              className={home.about_text}
            >
              ABOUT&emsp;推し♡だいありー
            </span>
          </Link>
        </div>
        {loading ? (
          <button className={home.register_button}>
            <CircularProgress sx={{ color: '#ff94df', mt: -1 }} size={40} />
          </button>
        ) : (
          <Button
            className={home.register_button}
            onClick={() => {
              handleClick();
              loginWithRedirect();
            }}
          >
            <HowToRegIcon
              sx={{
                fontSize: '22px',
                mb: '-5.5px',
                mr: '10px',
                color: '#ff6fc8',
              }}
            />
            <span className={home.register_text}>新規登録 / ログイン</span>
          </Button>
        )}

        <div style={{ textAlign: 'center' }}>
          <img
            src={`${imageDomain}/admin/main-image.png`}
            alt='picture'
            width='800'
            className={home.main_image}
          />
        </div>

        {/* <GeneralDiaryList /> */}
      </div>
    </div>
  );
};

export default Home;
