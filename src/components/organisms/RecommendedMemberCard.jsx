import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Button } from './../atoms/atoms';
import card from './../../css/organisms/card.module.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={card.card_whole}
        sx={{
          boxShadow: '0 12px 10px -6px rgba(176, 170, 168, 0.7)',
        }}
      >
        <div>
          <p className={card.card_text}>
            <span className={card.card_text_property}>
              <AutoAwesomeIcon
                sx={{ fontSize: '18px', mb: '-1.5px', color: '#FF8C00' }}
              />
              &nbsp;&nbsp;ニックネーム:
            </span>
            &nbsp;
            {nickname ? nickname : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>
              <GroupsIcon
                sx={{ fontSize: '18px', mb: '-3.7px', color: 'red' }}
              />
              &nbsp;&nbsp;グループ:
            </span>
            &nbsp;&nbsp;
            {group ? group : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>
              <VolunteerActivismIcon
                sx={{ fontSize: '18px', mb: '-1.5px', color: '#FF1493' }}
              />
              &nbsp;&nbsp;初めて会った日:
            </span>
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
                  <span className={card.card_text_property}>
                    <AddAPhotoIcon
                      sx={{ fontSize: '18px', mb: '-1.8px', color: 'blue' }}
                    />
                    &nbsp;&nbsp;総チェキ数:
                  </span>
                  &nbsp;{totalMemberPolaroidCount}
                </p>
                <p className={card.card_text}>
                  <span className={card.card_text_property}>
                    <BorderColorIcon
                      sx={{ fontSize: '18px', mb: '-1px', color: '#00AA00' }}
                    />
                    &nbsp;&nbsp;日記数:
                  </span>{' '}
                  &nbsp;
                  {DiariesCount}
                </p>
              </div>
              <div className={card.card_right_whole}>
                <Link to={diaryUrl}>
                  <Button>
                    日記を見る
                    <br />
                    追加する
                  </Button>
                </Link>
                <Link to={editUrl}>
                  <Button>
                    推しメンの
                    <br />
                    情報を編集
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Grid>
  );
};

export default RecommendedMemberCard;
