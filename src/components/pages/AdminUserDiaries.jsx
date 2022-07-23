import { useParams, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { Button } from './../atoms/atoms';
import { Loading, AdminUserDiariesList } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

import button from './../../css/atoms/button.module.css';

const AdminUserDiaries = () => {
  const { user_id } = useParams();
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      <Link to='/admin'>
        <Button className={button.recommended_and_diary_button}>
          ページ戻る
        </Button>
      </Link>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <AdminUserDiariesList role={data.role} userId={user_id} />
          </>
        )
      ) : (
        <>
          <p>{user_data.name}さんログイン中</p>
          <AdminUserDiariesList role={user_data.role} userId={user_id} />
        </>
      )}
    </>
  );
};

export default AdminUserDiaries;
