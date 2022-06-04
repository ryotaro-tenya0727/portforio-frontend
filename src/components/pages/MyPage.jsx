import { useUsersApi } from './../../hooks/useUsers';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { RecommendedMembersList } from './../templates/Templates';

const Mypage = () => {
  const { useGetAccesstokenAndCreateUser } = useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isLoading, isIdle } = useGetAccesstokenAndCreateUser();
  return (
    <div>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <h1>Mypage</h1>
            <Link to='/recommended-members/new'>推しメン登録ページへ</Link>
            <ReactQueryDevtools initialIsOpen={false} />
            <RecommendedMembersList />
          </>
        )
      ) : (
        <>
          <p key={user_data.id}>{user_data.name}さんログイン中</p>
          <h1>Mypage</h1>
          <Link to='/recommended-members/new'>推しメン登録ページへ</Link>
          <ReactQueryDevtools initialIsOpen={false} />
          <RecommendedMembersList />
        </>
      )}
    </div>
  );
};

export default Mypage;
