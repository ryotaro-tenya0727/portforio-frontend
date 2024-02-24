import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import { API_URL } from '../../urls/index';
import { useAuth0 } from '@auth0/auth0-react';
import { Circular } from './../atoms/atoms';

import {
  RecommendedMembersList,
  LoginUserInformation,
  PolaroidGraph,
  Notifications,
} from './Templates';

import MypageMenu from './../../css/templates/mypageMenu.module.css';
import Pusher from 'pusher-js';

const MyPageMenu = ({ user }) => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const [value, setValue] = useState('2');
  const { getAccessTokenSilently, user: authUser } = useAuth0();
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let pusher;
  let channel;
  let channelName;

  useEffect(() => {
    pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      channelAuthorization: {
        endpoint: `${API_URL}/api/v1/user/pusher_auth`,
      },
    });

    (async () => {
      const accessToken = await getAccessTokenSilently();
      await axios
        .post(
          `${API_URL}/api/v1/user/users/user_info`,
          { name: authUser.name, image: authUser.picture },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          channelName = `private-notification-user-${response.data.user_id}-channel`;
          channel = pusher.subscribe(channelName);
          channel.bind('new-notification-event', function (data) {
            setNotificationCount(data.new_notifications_count);
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    })();
    return () => {
      // Pusherの接続を切断する
      pusher.disconnect();
    };
  }, []);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffa5e4',
      },
      secondary: {
        main: '#fff',
      },
    },
  });
  if (isLoading) {
    return <Circular large={80} small={60} top={120} />;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='icon position tabs example'
            textColor={'primary'}
            indicatorColor={'primary'}
            sx={{
              bgcolor: '#fff',
              borderRadius: '8px',
              border: 'solid 2px #EEEEEE',
              '@media screen and (max-width:500px)': {
                height: '70px',
              },
              '@media screen and (max-width:400px)': {
                height: '70px',
              },
            }}
          >
            <Tab
              icon={
                <NotificationsIcon
                  sx={{
                    fontSize: 39,
                    '@media screen and (max-width:700px)': {
                      fontSize: 30,
                    },
                  }}
                />
              }
              iconPosition='bottom'
              label={
                <span className={MypageMenu.menu_text}>
                  通知
                  {notificationCount === 0 ? (
                    <></>
                  ) : (
                    <span className={MypageMenu.notification_count}>
                      {notificationCount}
                    </span>
                  )}
                </span>
              }
              sx={{ width: 1 / 4 }}
              value='0'
            />

            <Tab
              icon={
                <MonochromePhotosIcon
                  sx={{
                    fontSize: 39,
                    '@media screen and (max-width:700px)': {
                      fontSize: 30,
                    },
                  }}
                />
              }
              iconPosition='bottom'
              label={<span className={MypageMenu.menu_text}>チェキグラフ</span>}
              sx={{ width: 1 / 4 }}
              value='1'
            />
            <Tab
              icon={
                <>
                  <img
                    src={`${imageDomain}/admin/menu-image.png`}
                    alt='picture'
                    className={MypageMenu.menu_recommended_member_icon}
                  />
                </>
              }
              iconPosition='bottom'
              label={<span className={MypageMenu.menu_text}>推しメン一覧</span>}
              sx={{ width: 1 / 4 }}
              value='2'
            />
            <Tab
              icon={
                <AccountBoxIcon
                  sx={{
                    fontSize: 39,
                    '@media screen and (max-width:700px)': {
                      fontSize: 30,
                    },
                  }}
                />
              }
              iconPosition='bottom'
              label={<span className={MypageMenu.menu_text}>プロフィール</span>}
              sx={{ width: 1 / 4 }}
              value='3'
            />
          </Tabs>
          <TabPanel value={'0'} sx={{ padding: 0 }}>
            <p
              style={{
                textAlign: 'center',
                marginTop: '40px',
              }}
            >
              <Notifications
                changeNotificationCount={setNotificationCount}
                notificationCount={notificationCount}
              />
            </p>
          </TabPanel>
          <TabPanel value={'1'} sx={{ padding: 0 }}>
            <PolaroidGraph />
          </TabPanel>
          <TabPanel value={'2'} sx={{ padding: 0 }}>
            <RecommendedMembersList />
          </TabPanel>
          <TabPanel value={'3'} sx={{ padding: 0 }}>
            <LoginUserInformation user={user} />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </>
  );
};

export default MyPageMenu;
