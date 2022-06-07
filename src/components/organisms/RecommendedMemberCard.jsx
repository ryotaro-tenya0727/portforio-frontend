import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import card from './../../css/organisms/card.module.css';

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
    <Grid item xs={12} sm={6} lg={4}>
      <Paper className={card.card_whole}>
        <div>
          <p className={card.card_text}>
            <span className={card.card_text_property}>ニックネーム:</span>
            &nbsp;
            {nickname ? nickname : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>グループ:</span> &nbsp;
            {group ? group : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>初めて会った日:</span>
            &nbsp;&nbsp;
            {firstMetDate ? firstMetDate : '未入力'}
          </p>
        </div>
        <div>
          {recommendedMemberId === undefined ? (
            <p>推しメン作成中</p>
          ) : (
            <div className={card.card_second_whole}>
              <div className={card.card_left_whole}>
                <p className={card.card_text}>
                  <span className={card.card_text_property}>総チェキ数:</span>
                  &nbsp;{totalMemberPolaroidCount}
                </p>
                <p className={card.card_text}>
                  <span className={card.card_text_property}>日記数:</span>{' '}
                  &nbsp;
                  {DiariesCount}
                </p>
              </div>
              <div className={card.card_right_whole}>
                <Link to={diaryUrl}>
                  日記を見る
                  <br />
                  追加する
                </Link>
                <br />
                <Link to={editUrl}>
                  {nickname}の<br />
                  情報を編集
                </Link>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default RecommendedMemberCard;
