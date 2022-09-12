import { Link } from 'react-router-dom';
import { Button } from './../atoms/atoms';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import homeheaders from './../../css/organisms/homeheaders.module.css';
import button from './../../css/atoms/button.module.css';

const HomeHeaders = () => {
  return (
    <div className={homeheaders.wrapper}>
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div>
          <Link to='/timeline'>
            <Button className={button.users}>
              <SpeakerNotesIcon
                sx={{
                  color: '#ff66d1',
                  fontSize: '16px',
                  mr: 0.4,
                  mb: -0.5,
                  '@media screen and (min-width:700px)': {
                    fontSize: '22px',
                    mb: -1,
                    mr: 1,
                  },
                }}
              />
              タイムライン
            </Button>
          </Link>
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
              ユーザ一覧
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeaders;
