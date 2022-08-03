import { useQueryClient } from 'react-query';

import { Loading, AdminUserList } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { LoginName } from './../molecules/Molecules';
import { useUsersApi } from './../../hooks/useUsers';

const AdminUsers = () => {
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <LoginName name={data.name} />
            <AdminUserList role={data.role} />
          </>
        )
      ) : (
        <>
          <LoginName name={userData.name} />
          <AdminUserList role={userData.role} />
        </>
      )}
    </>
  );
};

export default AdminUsers;
