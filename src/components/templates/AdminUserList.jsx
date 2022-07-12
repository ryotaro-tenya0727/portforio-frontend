import { useAdminUsersApi } from './../../hooks/useAdminUser';
import CircularProgress from '@mui/material/CircularProgress';
import { RedirectToLogin } from './../pages/Pages';
import Card from '@mui/material/Card';
import card from './../../css/organisms/card.module.css';
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
        <>
          {adminUsers.data.map((user) => {
            return (
              <Card
                className={card.card_whole}
                sx={{
                  boxShadow:
                    'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
                  bgcolor: '#FFFFFF',
                  mt: 2,
                  mb: 2,
                  height: '50px',
                }}
              >
                <p>
                  <strong>id</strong>:&ensp;[{user.attributes.id}]&ensp;
                  <strong>名前</strong>:&ensp;[{user.attributes.name}]&ensp;
                  <strong>sub</strong>:&ensp;[{user.attributes.sub}]&ensp;
                  <strong>総チェキ数</strong>:&ensp;[
                  {user.attributes.total_polaroid_count}
                  ]&ensp;
                </p>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
};

export default AdminUserList;
