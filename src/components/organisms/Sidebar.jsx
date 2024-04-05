import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import TwitterIcon from '@mui/icons-material/Twitter';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import CircularProgress from '@mui/material/CircularProgress';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { useAuth0 } from '@auth0/auth0-react';

import { AuthGuardContext } from './../../providers/AuthGuard';
import { userRepository } from './../../repositories/userRepository';

import './../../css/organisms/sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const { setOpenMenu } = useContext(AuthGuardContext);
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };
  const SidebarData = [
    {
      title: 'ホーム',
      icon: (
        <HomeIcon
          sx={{
            color: '#ff94df',
            fontSize: '20.5px',
            '@media screen and (min-width:500px)': {
              fontSize: '22.5px',
              mr: 0.5,
            },
          }}
        />
      ),
      link: '/',
    },
    {
      title: 'マイページ',
      icon: (
        <PersonIcon
          sx={{
            color: '#ff94df',
            fontSize: '20.5px',
            '@media screen and (min-width:500px)': {
              fontSize: '22.5px',
              mr: 0.5,
            },
          }}
        />
      ),
      link: '/mypage',
    },
    {
      title: 'タイムライン',
      icon: (
        <SpeakerNotesIcon
          sx={{
            color: '#ff94df',
            fontSize: '20.5px',
            '@media screen and (min-width:500px)': {
              fontSize: '22.5px',
              mr: 0.5,
            },
          }}
        />
      ),
      link: '/timeline',
    },
    {
      title: (
        <>
          {' '}
          {isLoading ? (
            <CircularProgress
              sx={{ color: '#ff94df', ml: '5px', mt: '5px' }}
              size={30}
            />
          ) : (
            <>
              {' '}
              {isAuthenticated ||
                (loading ? (
                  <CircularProgress
                    sx={{ color: '#ff94df', ml: '5px', mt: '7px' }}
                    size={30}
                  />
                ) : (
                  <p style={{ cursor: 'pointer' }}>ログイン</p>
                ))}
              {isAuthenticated &&
                (loading ? (
                  <CircularProgress
                    sx={{ color: '#ff94df', ml: '5px', mt: '5px' }}
                    size={30}
                  />
                ) : (
                  <p style={{ cursor: 'pointer' }}>ログアウト</p>
                ))}
            </>
          )}
        </>
      ),
      icon: (
        <>
          {isAuthenticated ? (
            <LogoutIcon
              sx={{
                color: '#ff94df',
                fontSize: '20.5px',
                '@media screen and (min-width:500px)': {
                  fontSize: '22.5px',
                  mr: 0.5,
                },
              }}
            />
          ) : (
            <LoginIcon
              sx={{
                color: '#ff94df',
                fontSize: '20.5px',
                '@media screen and (min-width:500px)': {
                  fontSize: '22.5px',
                  mr: 0.5,
                },
              }}
            />
          )}
        </>
      ),
      function: isAuthenticated
        ? () => {
            handleClick();
            logout();
          }
        : () => {
            handleClick();
            loginWithRedirect();
          },
    },
    {
      title: '開発者のアカウント',
      icon: (
        <TwitterIcon
          sx={{
            color: '#2C7CFF',
            fontSize: '20.5px',
            '@media screen and (min-width:500px)': {
              fontSize: '22.5px',
              mr: 0.5,
            },
          }}
        />
      ),
      link: 'https://twitter.com/naka_ryo_z',
    },
    {
      title: '公式アカウント',
      icon: (
        <TwitterIcon
          sx={{
            color: '#2C7CFF',
            fontSize: '20.5px',
            '@media screen and (min-width:500px)': {
              fontSize: '22.5px',
              mr: 0.5,
            },
          }}
        />
      ),
      link: 'https://twitter.com/idol_otaku_web',
    },
    {
      title: 'ツイートでシェア',
      icon: (
        <TwitterIcon
          sx={{
            color: '#2C7CFF',
            fontSize: '20.5px',
            '@media screen and (min-width:500px)': {
              fontSize: '22.5px',
              mr: 0.5,
            },
          }}
        />
      ),
      link: 'https://twitter.com/intent/tweet?text=%0a%23推しだいありー%0ahttps://www.oshi-diary.com/',
    },
    {
      title: '利用規約',
      link: '/term-of-service',
    },
    {
      title: 'プライバシーポリシー',

      link: '/privacy-policy',
    },
    {
      title: (
        <>
          {' '}
          {isLoading ? (
            <CircularProgress
              sx={{ color: '#ff94df', ml: '5px', mt: '5px' }}
              size={30}
            />
          ) : (
            <>
              {' '}
              {isAuthenticated &&
                (loading ? (
                  <CircularProgress
                    sx={{ color: '#ff94df', ml: '5px', mt: '5px' }}
                    size={30}
                  />
                ) : (
                  <p style={{ cursor: 'pointer' }}>退会する</p>
                ))}
            </>
          )}
        </>
      ),
      icon: (
        <>
          {isAuthenticated && (
            <BrokenImageIcon
              sx={{
                fontSize: '20.5px',
                '@media screen and (min-width:500px)': {
                  fontSize: '22.5px',
                  mr: 0.5,
                },
              }}
            />
          )}
        </>
      ),
      function:
        isAuthenticated &&
        (async () => {
          if (window.confirm('退会してあなたのアカウントを削除しますか？')) {
            handleClick();
            const token = await getAccessTokenSilently();
            await userRepository.deleteUser(token);
            logout();
          }
        }),
    },
  ];

  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {SidebarData.map((value, key) => {
          return (
            <div
              key={key}
              id={window.location.pathname === value.link ? 'active' : ''}
              className='row'
              onClick={() => {
                if (value.link === 'https://twitter.com/idol_otaku_web') {
                  window.open(value.link, '_blank');
                  return;
                } else if (value.title === 'ツイートでシェア') {
                  window.open(value.link, '_blank');
                  return;
                } else if (value.link === 'https://twitter.com/naka_ryo_z') {
                  window.open(value.link, '_blank');
                  return;
                } else if (value.link !== undefined) {
                  navigate(value.link);
                  setOpenMenu(false);
                }
                if (value.function) {
                  value.function();
                }
              }}
            >
              <div id='icon'>{value.icon}</div>
              <div id='title'>{value.title}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
