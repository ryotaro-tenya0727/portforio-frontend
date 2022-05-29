import { useUsersApi } from './../../hooks/useUsers';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

const Mypage = () => {
  const { useGetAccesstokenAndCreateUser } = useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isSuccess, isLoading, isIdle } =
    useGetAccesstokenAndCreateUser();

  return (
    <div>
      {/* {data &&
        [data].map((user) => {
          return <p key={user.id}>{user.name}</p>;
        })} */}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            {[data].map((user) => {
              return <p key={user.id}>{user.name}</p>;
            })}
            <h1>Mypage</h1>
            <Link to='/recommendedmambers/new'>推しメン登録ページへ</Link>
            <ReactQueryDevtools initialIsOpen={false} />
          </>
        )
      ) : (
        <>
          <p key={user_data.id}>{user_data.name}</p>
          <h1>Mypage</h1>
          <Link to='/recommendedmambers/new'>推しメン登録ページへ</Link>
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
      <h1>推しメン一覧</h1>
    </div>
  );
};

export default Mypage;
