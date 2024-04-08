import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import HomeIcon from '@mui/icons-material/Home';
import CircularProgress from '@mui/material/CircularProgress';
import useMedia from 'use-media';

import { Button, MenuButton } from './../atoms/atoms';
import { TimeLineList } from './../templates/Templates';
import button from './../../css/atoms/button.module.scss';
import users from './../../css/pages/users.module.css';

const TimeLine = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const isWide = useMedia({ minWidth: '700px' });
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '150px' }}>
        <CircularProgress
          sx={{
            color: '#ff94df',
            mt: -1,
            fontSize: '80px',
            '@media screen and (max-width:700px)': {
              mt: -0.4,
            },
          }}
          size={isWide ? 140 : 100}
        />
      </div>
    );
  }
  return (
    <>
      <p className={users.header_wrapper}>
        <Link to='/'>
          <Button className={button.recommended_and_diary_button}>
            <HomeIcon
              sx={{
                fontSize: '20px',
                mb: '-4.5px',
                mr: '5px',
                color: '#ff64db',
                '@media screen and (max-width:700px)': {
                  fontSize: '17px',
                },
              }}
            />
            トップページへ
          </Button>
        </Link>
        <MenuButton />
      </p>
      <TimeLineList isAuthenticated={isAuthenticated} />
    </>
  );
};

export default TimeLine;
