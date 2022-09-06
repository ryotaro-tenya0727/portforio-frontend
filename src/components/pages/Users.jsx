import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import HomeIcon from '@mui/icons-material/Home';

import { Button, MenuButton } from './../atoms/atoms';
import { UsersList } from './../templates/Templates';
import button from './../../css/atoms/button.module.css';
import users from './../../css/pages/users.module.css';

const Users = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <>ローディング</>;
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

      <UsersList isAuthenticated={isAuthenticated} />
    </>
  );
};

export default Users;
