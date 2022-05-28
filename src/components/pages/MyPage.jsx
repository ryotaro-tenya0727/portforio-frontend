import { useAuth0 } from '@auth0/auth0-react';
// import { AuthGuardContext } from './../../providers/AuthGuard';
// import { useContext } from 'react';

const Mypage = () => {
  const { user } = useAuth0();
  // const { accessToken } = useContext(AuthGuardContext);
  // console.log(accessToken);
  return (
    <div>
      <h1>Mypage</h1>
      <h1>{user && user.name}</h1>
    </div>
  );
};

export default Mypage;
