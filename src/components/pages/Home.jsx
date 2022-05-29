import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      <button onClick={() => loginWithRedirect()}>ログイン</button>
      <h1>Home</h1>
      <h2>ログアウトボタン</h2>
      <button onClick={() => logout()}>ログアウト</button>
    </div>
  );
};

export default Home;
