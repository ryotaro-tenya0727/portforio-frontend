import { useUsersApi } from './../../hooks/useUsers';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const { useGetAccesstokenAndCreateUser } = useUsersApi();
  const { data, isSuccess } = useGetAccesstokenAndCreateUser();

  return (
    <div>
      {isSuccess && <p>a</p>}
      {data &&
        [data].map((user) => {
          return <p key={user.id}>{user.name}</p>;
        })}

      <h1>Mypage</h1>
      <Link to='/recommendedmambers/new'>推しメン登録ページへ</Link>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default Mypage;
