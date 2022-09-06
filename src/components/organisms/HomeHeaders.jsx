import { Link } from 'react-router-dom';
import { Button } from './../atoms/atoms';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import homeheaders from './../../css/organisms/homeheaders.module.css';
import button from './../../css/atoms/button.module.css';

const HomeHeaders = () => {
  return (
    <div className={homeheaders.wrapper}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'right' }}>
        <Link to='/users'>
          <Button className={button.users}>
            <SupervisedUserCircleIcon
              sx={{
                color: '#ff66d1',
                fontSize: '16px',
                mr: 1,
                mb: -0.5,
                '@media screen and (min-width:700px)': {
                  fontSize: '22px',
                  mb: -0.8,
                },
              }}
            />
            ユーザーいちらん
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeHeaders;
