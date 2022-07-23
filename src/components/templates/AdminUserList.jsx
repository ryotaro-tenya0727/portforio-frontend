import CircularProgress from '@mui/material/CircularProgress';

import { RedirectToLogin } from './../pages/Pages';
import { AdminUserCard } from './../organisms/Organisms';
import { useAdminUsersApi } from './../../hooks/useAdminUser';

const AdminUserList = ({ role }) => {
  const { useGetAdminUsers } = useAdminUsersApi();
  const { data: adminUsers, isIdle, isLoading } = useGetAdminUsers();

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
        <>
          {adminUsers.data.map((user, index) => {
            return (
              <AdminUserCard
                key={index}
                id={user.attributes.id}
                name={user.attributes.name}
                sub={user.attributes.sub}
                total_polaroid_count={user.attributes.total_polaroid_count}
                diariesCount={user.attributes.diaries_count}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default AdminUserList;
