import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './App.css';

const postUrl = `${process.env.REACT_APP_REST_URL}/posts`;
const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';

function App() {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState('');
  // 追加
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const createUsers = useCallback((user_name, token) => {
    axios.post(
      `${process.env.REACT_APP_REST_URL}/users`,
      {
        name: user_name,
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    // stateはリロードしたら初期値
    isAuthenticated || getToken();
    isAuthenticated && user && createUsers(user.name, token);
  }, [isAuthenticated, getAccessTokenSilently, createUsers, token, user]);

  return (
    <div className='App'>
      <div style={{ padding: '20px' }}>
        <h2>ログインボタンはここ</h2>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
        <h2>ログアウトボタン</h2>
        <button onClick={() => logout()}>ログアウト</button>
        <h2>ログイン状態</h2>
        {isAuthenticated ? <p>{user.name}</p> : <p> ログアウト</p>}
        <button onClick={() => createUsers(user.name)}>ユーザー作成</button>

        {user && <img src={user.picture}></img>}
      </div>
    </div>
  );
}

export default App;
