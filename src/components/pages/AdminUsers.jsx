import { useUsersApi } from './../../hooks/useUsers';
import { RedirectToLogin } from './Pages';
import { useQueryClient } from 'react-query';
import { Loading, AdminUserList } from './../templates/Templates';
const AdminUsers = () => {
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <AdminUserList role={data.role} />
          </>
        )
      ) : (
        <>
          <p>{user_data.name}さんログイン中</p>
          <AdminUserList role={user_data.role} />
        </>
      )}
    </>
  );
};

export default AdminUsers;
