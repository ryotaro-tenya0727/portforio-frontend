import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import card from './../../css/organisms/card.module.css';
import { Button } from './../atoms/atoms';

import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

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
  console.log(diaryImages);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={card.card_whole}
        sx={{
          boxShadow: '0 12px 10px -6px rgba(176, 170, 168, 0.7)',
        }}
      >
        {diaryId === undefined ? (
          <p>日記作成中</p>
        ) : (
          <div className={card.card_diary_button_list}>
            <Link to={showUrl}>
              <Button>日記の詳細を見る</Button>
            </Link>
            <Link to={editUrl}>
              <Button>日記を編集する</Button>
            </Link>
          </div>
        )}
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <AudiotrackIcon
              sx={{ fontSize: '18px', mb: '-3.3px', color: 'red' }}
            />
            &nbsp;&nbsp;イベント名:
          </span>
          &nbsp;
          {eventName ? eventName : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <CalendarMonthIcon
              sx={{ fontSize: '18px', mb: '-2.4px', color: '#3300FF' }}
            />
            &nbsp;&nbsp;日付:
          </span>
          &nbsp;
          {eventDate ? eventDate : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <AccountBalanceIcon
              sx={{ fontSize: '18px', mb: '-2.35px', color: '#00AA00' }}
            />
            &nbsp;&nbsp;会場:
          </span>
          &nbsp;
          {eventVenue ? eventVenue : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <PhotoCameraBackIcon
              sx={{ fontSize: '18px', mb: '-2.5px', color: '#FF8C00' }}
            />
            &nbsp;&nbsp;この日のチェキ数:
          </span>
          &nbsp;
          {eventPolaroidCount}
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
              <img
                src={`${diaryImages[0]}`}
                alt='picture'
                width='150'
                height='150'
                className={card.card_photo}
              />
              <img
                src={`${diaryImages[1]}`}
                alt='picture'
                width='150'
                height='150'
                className={card.card_photo}
              />
            </>
          )}
        </div>
      </Card>
    </Grid>
  );
};

export default UserDiaryCard;
