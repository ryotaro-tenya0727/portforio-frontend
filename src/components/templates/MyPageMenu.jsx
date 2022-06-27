import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { RecommendedMembersList, LoginUserInformation } from './Templates';

import MypageMenu from './../../css/templates/mypageMenu.module.css';

const MyPageMenu = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const [value, setValue] = useState('2');
  const handleChange = (event, newValue) => {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <TabContext value={value}>
          <ul className={MypageMenu.sakura}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='icon position tabs example'
            textColor={'primary'}
            indicatorColor={'primary'}
            sx={{
              width: 1,
              bgcolor: '#fff',
              borderRadius: '8px',
              border: 'solid 2px #EEEEEE',
            }}
          >
            <Tab
              icon={<NotificationsIcon sx={{ fontSize: 39 }} />}
              iconPosition='bottom'
              label={<span className={MypageMenu.menu_text}>お知らせ</span>}
              sx={{ width: 1 / 4 }}
              value='0'
            />

            <Tab
              icon={<MonochromePhotosIcon sx={{ fontSize: 39 }} />}
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
                    width='41'
                    height='41'
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
              icon={<AccountBoxIcon sx={{ fontSize: 40 }} />}
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
                marginTop: '50px',
                fontSize: '20px',
              }}
            >
              Comming soon...
            </p>
          </TabPanel>
          <TabPanel value={'1'} sx={{ padding: 0 }}>
            {' '}
            <p
              style={{
                textAlign: 'center',
                marginTop: '50px',
                fontSize: '20px',
              }}
            >
              Comming soon...
            </p>
          </TabPanel>
          <TabPanel value={'2'} sx={{ padding: 0 }}>
            <RecommendedMembersList />
          </TabPanel>
          <TabPanel value={'3'} sx={{ padding: 0 }}>
            <LoginUserInformation />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </>
  );
};

export default MyPageMenu;
