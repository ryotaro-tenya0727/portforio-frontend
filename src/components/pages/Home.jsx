import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import HelpIcon from '@mui/icons-material/Help';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link as Scroll } from 'react-scroll';
import useMedia from 'use-media';

import { Button, HomeMenuButtom } from './../atoms/atoms';
import { HomeHeaders } from './../organisms/Organisms';
import { GeneralDiaryList } from './../templates/Templates';
import usePageTracking from './../../hooks/useTracking';
import home from './../../css/pages/home.module.css';

const Home = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  usePageTracking();
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };
  const isWide = useMedia({ minWidth: '700px' });
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
        <HomeHeaders />
        <div className={home.home}>
          <div className={home.buttons}>
            <HomeMenuButtom />
            <br />
            {isLoading ? (
              <button className={home.login_button}>
                <CircularProgress size={30} sx={{ color: '#ff94df' }} />
              </button>
            ) : (
              <>
                {isAuthenticated ||
                  (loading ? (
                    <button className={home.login_button}>
                      <CircularProgress size={30} sx={{ color: '#ff94df' }} />
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
                      <LoginIcon
                        sx={{
                          color: '#ff94df',
                          fontSize: '16px',
                          mb: -0.2,
                          '@media screen and (min-width:700px)': {
                            fontSize: '22px',
                          },
                        }}
                      />
                      <p>ログイン</p>
                    </button>
                  ))}
                {isAuthenticated &&
                  (loading ? (
                    <>
                      <button className={home.login_button}>
                        <CircularProgress sx={{ color: '#ff94df' }} size={30} />
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
                      <LogoutIcon
                        sx={{
                          color: '#ff94df',
                          fontSize: '16px',
                          mb: -0.2,
                          '@media screen and (min-width:700px)': {
                            fontSize: '22px',
                          },
                        }}
                      />
                      <p>
                        ログ
                        <br />
                        アウト
                      </p>
                    </button>
                  ))}
              </>
            )}

            <Link to='#' style={{ margin: '0 auto' }} className={home.about}>
              <Scroll to='about' smooth={true}>
                <HelpIcon
                  sx={{
                    color: '#ff94df',
                    fontSize: '30px',
                    '@media screen and (max-width:700px)': {
                      display: 'none',
                    },
                  }}
                />
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
              </Scroll>
            </Link>
          </div>
          <div style={{ textAlign: 'center' }}>
            {loading ? (
              <button className={home.register_button}>
                <CircularProgress
                  sx={{
                    color: '#ff94df',
                    mt: -1,
                    fontSize: '80px',
                    '@media screen and (max-width:700px)': {
                      mt: -0.4,
                    },
                  }}
                  size={isWide ? 40 : 30}
                />
              </button>
            ) : (
              <>
                {isAuthenticated ? (
                  <>
                    {' '}
                    <Link to='mypage'>
                      <Button className={home.register_button}>
                        <HowToRegIcon
                          sx={{
                            fontSize: '22px',
                            mb: '-5.5px',
                            mr: '10px',
                            color: '#ff6fc8',
                          }}
                        />

                        <span className={home.register_text}>
                          マイページに行く
                        </span>
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {' '}
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
                      <span className={home.register_text}>
                        新規登録 / ログイン
                      </span>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
          <div style={{ textAlign: 'center' }}>
            <img
              src={`${imageDomain}/admin/main-image.png`}
              alt='picture'
              className={home.main_image}
            />
          </div>
        </div>
      </div>

      <div className={home.about_wrapper} id='about'>
        <p className={home.about_title}>推し♡だいありーとは？</p>
        <p className={home.about_description}>
          推しメンとの思い出を日記のように保存できるサービスです。
        </p>
        <p className={home.about_description}>
          推しメンひとり一人とその日の出来事を詳細に記録することができます。
        </p>
        <p className={home.about_title}>みんなの日記</p>
        <GeneralDiaryList />

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
