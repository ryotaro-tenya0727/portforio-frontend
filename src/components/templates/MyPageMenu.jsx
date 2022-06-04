import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import NotificationsIcon from '@mui/icons-material/Notifications';

import MypageMenu from './../../css/templates/mypageMenu.module.css';

import { RecommendedMembersList } from './Templates';

const MyPageMenu = () => {
  const [value, setValue] = useState('2');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffa5e4',
      },
    },
  });
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
            sx={{ width: 1 }}
          >
            <Tab
              icon={<NotificationsIcon sx={{ fontSize: 39 }} />}
              iconPosition='bottom'
              label='通知'
              sx={{ width: 1 / 4 }}
              value='0'
            />

            <Tab
              icon={<MonochromePhotosIcon sx={{ fontSize: 39 }} />}
              iconPosition='bottom'
              label='メンバー別チェキグラフ'
              sx={{ width: 1 / 4 }}
              value='1'
            />
            <Tab
              icon={
                <>
                  <img
                    src='https://d2dshvnpldvez1.cloudfront.net/admin/menu-image.png'
                    alt='picture'
                    width='41'
                    height='41'
                    className={MypageMenu.menu_recommended_member_icon}
                  />
                </>
              }
              iconPosition='bottom'
              label={'推しメンリスト'}
              sx={{ width: 1 / 4 }}
              value='2'
            />
            <Tab
              icon={<AccountBoxIcon sx={{ fontSize: 40 }} />}
              iconPosition='bottom'
              label='プロフィール'
              sx={{ width: 1 / 4 }}
              value='3'
            />
          </Tabs>
          <TabPanel value={'3'}>プロフィール</TabPanel>
          <TabPanel value={'2'}>
            <RecommendedMembersList />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </>
  );
};

export default MyPageMenu;
