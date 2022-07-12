import Card from '@mui/material/Card';

import { Button } from './../atoms/atoms';
import { useAdminUsersApi } from './../../hooks/useAdminUser';
import button from './../../css/atoms/button.module.css';
import card from './../../css/organisms/card.module.css';

const AdminUserCard = ({ id, name, sub, total_polaroid_count }) => {
  const { useDeleteAdminUser } = useAdminUsersApi();
  const deleteAdminUser = useDeleteAdminUser(id);

  const deleteUser = (userId) => {
    if (window.confirm('選択したユーザーを消してよろしいですか？')) {
      deleteAdminUser.mutate();
    }
  };
  return (
    <Card
      className={card.card_whole}
      sx={{
        boxShadow:
          'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
        bgcolor: '#FFFFFF',
        mt: 2,
        mb: 2,
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <p>
        <strong>id</strong>:&ensp;[{id}]&ensp;
        <strong>名前</strong>:&ensp;[{name}]&ensp;
        <strong>sub</strong>:&ensp;[{sub}]&ensp;
        <strong>総チェキ数</strong>:&ensp;[
        {total_polaroid_count}
        ]&ensp;
        <Button className={button.button_card} onClick={() => deleteUser(id)}>
          このユーザーを削除
        </Button>
      </p>
    </Card>
  );
};

export default AdminUserCard;
