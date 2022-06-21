import { useAuth0 } from '@auth0/auth0-react';
import HomeIcon from '@mui/icons-material/Home';

import { BreadCrumbs } from './../organisms/Organisms';

const Home = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const breadcrumbs = [
    {
      title: (
        <>
          <HomeIcon
            sx={{
              fontSize: '21px',
              mb: '-4.5px',
              mr: '2px',
              color: '#ff7bd7',
            }}
          />
          ホーム
        </>
      ),
      to: '/',
    },
  ];
  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <br />
      <button onClick={() => loginWithRedirect()}>ログイン</button>
      <h1>Home</h1>
      <h2>ログアウトボタン</h2>
      <button onClick={() => logout()}>ログアウト</button>
    </div>
  );
};

export default Home;
