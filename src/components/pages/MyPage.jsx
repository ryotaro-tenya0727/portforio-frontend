import { useUsersApi } from './../../hooks/useUsers';

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
    </div>
  );
};

export default Mypage;
