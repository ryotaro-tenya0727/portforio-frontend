import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const RecommendedMemberCard = ({
  nickname,
  group,
  firstMetDate,
  diaryUrl,
  editUrl,
  recommendedMemberId,
  totalMemberPolaroidCount,
  DiariesCount,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <p>ニックネーム： {nickname ? nickname : '未入力'}</p>
        <p>グループ: {group ? group : '未入力'}</p>
        <p>初めて会った日: {firstMetDate ? firstMetDate : '未入力'}</p>

        {recommendedMemberId === undefined ? (
          <p>推しメン作成中</p>
        ) : (
          <>
            <p>トータルチェキ数: {totalMemberPolaroidCount}</p>
            <p>日記数: {DiariesCount}</p>
            <Link to={diaryUrl}>{nickname}の日記を見る・追加する</Link>
            <br />
            <Link to={editUrl}>{nickname}推しメンの情報を編集</Link>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default RecommendedMemberCard;
