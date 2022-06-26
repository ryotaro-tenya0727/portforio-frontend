import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import TwitterIcon from '@mui/icons-material/Twitter';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth0 } from '@auth0/auth0-react';

import { userRepository } from './../../repositories/userRepository';

import './../../css/organisms/sidebar.css';

function Sidebar() {
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
      icon: <HomeIcon sx={{ color: '#ff94df' }} />,
      link: '/',
    },
    {
      title: 'マイページ',
      icon: <PersonIcon sx={{ color: '#ff94df' }} />,
      link: '/mypage',
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
            <LogoutIcon sx={{ color: '#ff94df' }} />
          ) : (
            <LoginIcon sx={{ color: '#ff94df' }} />
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
      title: '利用規約',
      link: '/term-of-service',
    },
    {
      title: 'プライバシーポリシー',

      link: '/privacy-policy',
    },
    {
      title: 'お問い合わせ',

      link: '/upload',
    },

    {
      title: '公式アカウント',
      icon: (
        <TwitterIcon
          sx={{
            color: '#2C7CFF',
          }}
        />
      ),
      link: 'https://twitter.com/idol_otaku_web',
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
      icon: <>{isAuthenticated && <BrokenImageIcon />}</>,
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
                } else if (value.link !== undefined) {
                  window.location.pathname = value.link;
                }
                value.function();
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
