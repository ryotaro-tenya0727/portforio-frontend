import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import TwitterIcon from '@mui/icons-material/Twitter';

import Modal from '@mui/material/Modal';
import { useAuth0 } from '@auth0/auth0-react';

import './../../css/organisms/sidebar.css';

function Sidebar() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
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
            '認証確認中'
          ) : (
            <>
              {' '}
              {isAuthenticated || (
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => loginWithRedirect()}
                >
                  ログイン
                </p>
              )}
              {isAuthenticated && (
                <p style={{ cursor: 'pointer' }} onClick={() => logout()}>
                  ログアウト
                </p>
              )}
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
    },
    {
      title: '利用規約',
      link: '/#',
    },
    {
      title: 'プライバシーポリシー',

      link: '/#',
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
  ];

  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname === value.link ? 'active' : ''}
              className='row'
              onClick={() => {
                if (value.link === 'https://twitter.com/idol_otaku_web') {
                  window.open(value.link, '_blank');
                } else if (value.link !== undefined) {
                  window.location.pathname = value.link;
                }
              }}
            >
              <div id='icon'>{value.icon}</div>
              <div id='title'>{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
