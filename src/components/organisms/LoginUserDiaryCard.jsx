import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

import { Button } from './../atoms/atoms';
import button from './../../css/atoms/button.module.css';
import card from './../../css/organisms/card.module.css';

const UserDiaryCard = ({
  diaryId,
  eventName,
  eventDate,
  eventVenue,
  status,
  eventPolaroidCount,
  diaryImages,
  showUrl,
  editUrl,
}) => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={card.card_whole}
        sx={{
          boxShadow:
            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
        }}
      >
        {diaryId === undefined ? (
          <p>日記作成中</p>
        ) : (
          <div className={card.card_diary_button_list}>
            <Link to={showUrl}>
              <Button className={button.button_card}>日記の詳細を見る</Button>
            </Link>
            <Link to={editUrl}>
              <Button className={button.button_card}>日記を編集する</Button>
            </Link>
            <img
              src={`${imageDomain}/admin/diary_card_image.png`}
              alt='picture'
              width='135'
              height='135'
              className={card.recommended_member_card_image}
            />
          </div>
        )}
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <LibraryMusicIcon
              sx={{ fontSize: '19px', mb: '-4px', color: 'red' }}
            />
            &nbsp;&nbsp;イベント名:
          </span>
          &nbsp;
          {eventName ? eventName : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <CalendarMonthIcon
              sx={{ fontSize: '19px', mb: '-2.4px', color: '#3300FF' }}
            />
            &nbsp;&nbsp;日付:
          </span>
          &nbsp;
          {eventDate ? eventDate : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <AccountBalanceIcon
              sx={{ fontSize: '19px', mb: '-2.35px', color: '#00AA00' }}
            />
            &nbsp;&nbsp;会場:
          </span>
          &nbsp;
          {eventVenue ? eventVenue : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <PhotoCameraBackIcon
              sx={{ fontSize: '19px', mb: '-2.5px', color: '#FF8C00' }}
            />
            &nbsp;&nbsp;この日のチェキ数:
          </span>
          &nbsp;
          {eventPolaroidCount ? eventPolaroidCount : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>公開設定:</span>
          &nbsp;
          {status === 'published' ? '公開する' : '公開しない'}
        </p>
        <div className={card.card_photo_list}>
          {diaryId === undefined ? (
            <p>日記作成中</p>
          ) : (
            <>
              {diaryImages.map((diaryImageUrl, index) => {
                return (
                  <img
                    key={index}
                    src={`${diaryImageUrl}`}
                    alt='picture'
                    width='150'
                    height='150'
                    className={card.card_photo}
                    style={{ border: '4px solid #ff99c5', borderRadius: '5px' }}
                  />
                );
              })}
            </>
          )}
        </div>
      </Card>
    </Grid>
  );
};

export default UserDiaryCard;
