import { useAdminUsersApi } from './../../hooks/useAdminUser';
import CircularProgress from '@mui/material/CircularProgress';
import { RedirectToLogin } from './../pages/Pages';
const AdminUserList = ({ role }) => {
  const { useGetAdminUsers } = useAdminUsersApi();
  const { data: adminUsers, isIdle, isLoading } = useGetAdminUsers();
  console.log(adminUsers);
  return (
    <>
      {role === 'general' && <RedirectToLogin />}
      {isIdle || isLoading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <br />
          <CircularProgress size={130} sx={{ mt: '100px', color: '#ff7bd7' }} />
        </div>
      ) : (
        <>ユーザ取得</>
      )}
    </>
  );
};

export default AdminUserList;
