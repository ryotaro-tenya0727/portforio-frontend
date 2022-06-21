import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { Button } from './../atoms/atoms';
import button from './../../css/atoms/button.module.css';
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
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={card.card_whole}
        sx={{
          boxShadow:
            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
          bgcolor: '#FFFFFF',
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
            <img
              src={`${imageDomain}/admin/member_pen.png`}
              alt='picture'
              width='135'
              height='135'
              className={card.recommended_member_card_image}
            />
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
                    <CollectionsBookmarkIcon
                      sx={{ fontSize: '19px', mb: '-2.8px', color: '#00AA00' }}
                    />
                    &nbsp;&nbsp;日記数:
                  </span>{' '}
                  &nbsp;
                  {DiariesCount}
                </p>
              </div>
              <div className={card.card_right_whole}>
                <Link to={diaryUrl}>
                  <Button className={button.button_card}>
                    <AppRegistrationIcon
                      sx={{
                        fontSize: '28px',
                        mb: '-18.8px',
                        mr: '3px',
                      }}
                    />
                    <span>
                      日記を見る
                      <br />
                      &emsp;&emsp;追加する
                    </span>
                  </Button>
                </Link>
                <Link to={editUrl}>
                  <Button className={button.button_card}>
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
