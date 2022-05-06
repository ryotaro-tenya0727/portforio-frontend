import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './App.css';

function App() {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState('');
  const [members, setMembers] = useState([]);
  // 追加
  const createUsers = useCallback((user_name, token) => {
    axios.post(
      `${process.env.REACT_APP_REST_URL}/users`,
      {
        user: {
          name: user_name,
        },
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
  }, []);

  const createRecommendedMembers = useCallback((token) => {
    axios
      .post(
        `${process.env.REACT_APP_REST_URL}/user/recommended_members`,
        {
          recommended_member: {
            nickname: 'えみり',
            group: 'Queens',
            first_met_date: '2021-03-21',
          },
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        res.data.register_member && console.log('ok');
      });
  }, []);

  const fetchRecommendedMembers = useCallback((token) => {
    axios
      .get(
        `${process.env.REACT_APP_REST_URL}/user/recommended_members`,

        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setMembers(res.data.data);
      });
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
    // stateはリロードしたら初期化される
    isAuthenticated || getToken();
    isAuthenticated && user && token && createUsers(user.name, token);
  }, [isAuthenticated, token, user, getAccessTokenSilently, createUsers]);
  console.log(members);
  return (
    <div className='App'>
      <div style={{ padding: '20px' }}>
        <h2>ログインボタンはここ</h2>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
        <h2>ログアウトボタン</h2>
        <button onClick={() => logout()}>ログアウト</button>
        <h2>ログイン状態</h2>
        {isAuthenticated ? <p>{user.name}</p> : <p> ログアウト</p>}
        <button onClick={() => createRecommendedMembers(token)}>
          推しメン作成
        </button>
        <button onClick={() => fetchRecommendedMembers(token)}>
          推しメン取得
        </button>
        {members.map((member, index) => (
          <div key={index}>
            <p>{member.attributes.nickname}</p>
            <p>{member.attributes.group}</p>
            <p>{member.attributes.first_met_date}</p>
            <p>{member.attributes.uuid}</p>
          </div>
        ))}
        {user && <img src={user.picture}></img>}
      </div>
    </div>
  );
}

export default App;
