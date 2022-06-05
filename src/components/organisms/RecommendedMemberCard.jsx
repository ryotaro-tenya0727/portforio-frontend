import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const RecommendedMemberCard = ({
  nickname,
  group,
  firstMetDate,
  diaryUrl,
  editUrl,
  recommendedMemberUuid,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <p>{nickname}</p>
        <p>{group}</p>
        <p>{firstMetDate}</p>
        {recommendedMemberUuid === undefined ? (
          <p>推しメン作成中</p>
        ) : (
          <>
            <Link to={diaryUrl}>推しメンの日記を見る・追加する</Link>
            <br />
            <Link to={editUrl}>推しメンの情報を編集</Link>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default RecommendedMemberCard;
