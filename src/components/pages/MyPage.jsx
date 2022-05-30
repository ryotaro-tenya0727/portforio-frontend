import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { RecommendedMembersList } from './../organisms/Organisms';

const Mypage = () => {
  const { useGetAccesstokenAndCreateUser } = useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isSuccess, isLoading, isIdle } =
    useGetAccesstokenAndCreateUser();

  return (
    <div>
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
            <RecommendedMembersList />
          </>
        )
      ) : (
        <>
          <p key={user_data.id}>{user_data.name}</p>
          <h1>Mypage</h1>
          <Link to='/recommendedmambers/new'>推しメン登録ページへ</Link>
          <ReactQueryDevtools initialIsOpen={false} />
          <RecommendedMembersList />
        </>
      )}
      <h1>推しメン一覧</h1>
    </div>
  );
};

export default Mypage;
