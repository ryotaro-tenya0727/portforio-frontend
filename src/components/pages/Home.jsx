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

  const returnAbout = () => {
    window.scrollTo({
      top: 600,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#FFF4F6',
          marginTop: '-2.5px',
          borderRadius: '5px',
          margin: '0 calc(50% - 50vw)',
          width: '100vw',
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
                onClick={returnAbout}
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
              className={home.main_image}
            />
          </div>
        </div>
      </div>
      <div className={home.about_wrapper}>
        <p className={home.about_title}>推し♡だいありーとは？</p>
        <p className={home.about_description}>
          推しメンとの思い出を日記のように保存できるサービスです。
        </p>
        <p className={home.about_description}>
          推しメンひとり一人とその日の出来事を詳細に記録することができます。
        </p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img
            src={`${imageDomain}/admin/home-diary-min-min.png`}
            alt='picture'
            className={home.about_diary_image}
          />
        </div>
        <p className={home.about_title}>ツイート機能</p>
        <p className={home.about_description}>
          作成した日記を推しメンの名前を入れてツイートすることもできます。
        </p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img
            src={`${imageDomain}/admin/home-twitter-min.png`}
            alt='picture'
            className={home.about_diary_image}
          />
        </div>

        <p style={{ marginTop: '50px' }}>
          皆様が最高の思い出を作れますように。
        </p>
      </div>
    </>
  );
};

export default Home;
