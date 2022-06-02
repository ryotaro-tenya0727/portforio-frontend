import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

import { queryClient } from './lib/queryClient';
import { AuthGuardProvider } from './providers/AuthGuard';
import { Routers } from './route/Routers';

function App() {
  // 追加
  // const createUsers = useCallback((user_name, token, user_image) => {
  //   axios.post(
  //     `${process.env.REACT_APP_REST_URL}/users`,
  //     {
  //       user: {
  // name: user_name,
  // user_image: user_image,
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization: token,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // }, []);

  // const createRecommendedMembers = useCallback((token) => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_REST_URL}/user/recommended_members`,
  //       {
  //         recommended_member: {
  //           nickname: 'aa',
  //           group: 'Queens',
  //           first_met_date: '2021-03-21',
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     .catch((error) => {
  //       console.error(error.response.data);
  //     });
  // }, []);

  // const fetchRecommendedMembers = useCallback((token) => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_REST_URL}/user/recommended_members`,

  //       {
  //         headers: {
  //           Authorization: token,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setMembers(res.data.data);
  //       console.log(res.data.data);
  //     });
  // }, []);

  // const updateRecommendedMembers = useCallback((token, uuid) => {
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_REST_URL}/user/recommended_members/${uuid}`,
  //       {
  //         recommended_member: {
  //           nickname: 'aaaaa',
  //           group: '編集Queens33',
  //           first_met_date: '2021-03-21',
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  // .catch((error) => {
  //   console.error(error.response.data);
  // });
  // }, []);

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const accessToken = await getAccessTokenSilently({});
  //       setToken(accessToken);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   // stateはリロードしたら初期化される
  //   // isAuthenticated || getToken();
  //   // isAuthenticated &&
  //   //   user &&
  //   //   token &&
  //   //   createUsers(user.name, token, user.picture);
  // }, [isAuthenticated, token, user, getAccessTokenSilently]);
  // console.log(user);
  // const upLoadImageToS3 = useCallback(async (token, e) => {
  //   const file = e.target.files[0];
  //   const {
  //     data: { presigned_url },
  //   } = await axios
  //     .post(
  //       `${process.env.REACT_APP_REST_URL}/user/s3_presigned_url`,
  //       {
  //         presigned_url: {
  //           filename: file.name,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     .catch((error) => {
  //       console.error(error.response.data);
  //     });
  //   console.log(presigned_url);

  //   await axios.put(presigned_url, file, {
  //     headers: {
  //       'Content-Type': 'image/*',
  //     },
  //   });
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuardProvider>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </AuthGuardProvider>
    </QueryClientProvider>
  );
}

export default App;

/* <h2>ログインボタンはここ</h2>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
        <h2>ログアウトボタン</h2>
        <button onClick={() => logout()}>ログアウト</button>
        <h2>ログイン状態</h2>
        {isAuthenticated ? <p>{user.name}</p> : <p> ログアウト</p>} */

/* <p>写真追加</p> */

/* <input
          type='file'
          accept='image/*'
          multiple
          onChange={(e) => upLoadImageToS3(token, e)}
        /> */

/* <button onClick={() => createRecommendedMembers(token)}>
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
            <p>{member.attributes.recommend_user}</p>
            <button
              onClick={() =>
                updateRecommendedMembers(token, member.attributes.id)
              }
            >
              推しメン編集
            </button>
          </div>
        ))}
        {user && <img src={user.picture}></img>} */
