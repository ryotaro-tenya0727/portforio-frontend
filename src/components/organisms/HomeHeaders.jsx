import { Link } from 'react-router-dom';
import { Button } from './../atoms/atoms';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import homeheaders from './../../css/organisms/homeheaders.module.css';
import button from './../../css/atoms/button.module.css';
import home from './../../css/pages/home.module.css';

const HomeHeaders = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  return (
    <div className={homeheaders.wrapper}>
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <img
            src={`${imageDomain}/admin/logonewest.png`}
            alt='picture'
            className={home.logo}
          />
        </div>
        <div>
          <Link to='/users'>
            <Button className={button.users}>
              <SupervisedUserCircleIcon
                sx={{
                  color: '#ff66d1',
                  fontSize: '16px',
                  mr: 0.4,
                  mb: -0.5,
                  '@media screen and (min-width:700px)': {
                    fontSize: '22px',
                    mb: -0.8,
                    mr: 1,
                  },
                }}
              />
              ユーザ検索
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeaders;
