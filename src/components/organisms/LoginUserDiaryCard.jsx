import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const UserDiaryCard = ({
  diaryId,
  eventName,
  eventDate,
  eventVenue,
  eventPolaroidCount,
  showUrl,
  editUrl,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <p>ニックネーム： {eventName ? eventName : '未入力'}</p>
        <p>日付: {eventDate ? eventDate : '未入力'}</p>
        <p>会場: {eventVenue ? eventVenue : '未入力'}</p>
        <p>この日のチェキ数: {eventPolaroidCount}</p>

        {diaryId === undefined ? (
          <p>日記作成中</p>
        ) : (
          <>
            <Link to={showUrl}>この日記の詳細</Link>
            <br />
            <Link to={editUrl}>この日記を編集</Link>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default UserDiaryCard;
