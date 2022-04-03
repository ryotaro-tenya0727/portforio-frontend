import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './App.css';

const postIndex = `${process.env.REACT_APP_REST_URL}/posts`;

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
  const [posts, setPosts] = useState([]);
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  // 追加
  const fetchPosts = () => {
    axios.get(postIndex, headers).then((res) => {
      setPosts(res.data);
    });
  };
  // 追加
  const createPosts = () => {
    const data = {
      title: 'タイトル4',
      caption: '説明4',
    };
    axios.post('http://localhost:3000/api/v1/posts', data, headers);
  };
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    getToken();
  }, [getAccessTokenSilently]);

  return (
    <div className='App'>
      <div style={{ padding: '20px' }}>
        <h2>ログインボタン</h2>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
        <h2>ログアウトボタン</h2>
        <button onClick={() => logout()}>ログアウト</button>
        <h2>ログイン状態</h2>
        {isAuthenticated ? <p>{user.name}</p> : <p> ログアウト</p>}
        <h2>投稿作成</h2>
        <button onClick={createPosts}>投稿作成</button>
        <h2>投稿一覧</h2>
        <button onClick={fetchPosts}>投稿取得</button>
        {posts?.map((post, index) => (
          <div key={index}>
            <p>{post.title}</p>
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
