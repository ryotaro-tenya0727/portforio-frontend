import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  // 必要な機能をインポート
  console.log(user);
  return (
    <div className='App'>
      <div style={{ padding: '20px' }}>
        <h2>ログインボタン</h2>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
        <h2>ログアウトボタン</h2>
        <button onClick={() => logout()}>ログアウト</button>
        <h2>ログイン状態</h2>
        {isAuthenticated ? <p>{user.name}</p> : <p> ログアウト</p>}
      </div>
    </div>
  );
}

export default App;
