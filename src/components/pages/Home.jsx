import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  return (
    <div>
      <button onClick={() => loginWithRedirect()}>ログイン</button>
      <h1>{user && user.name}</h1>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
