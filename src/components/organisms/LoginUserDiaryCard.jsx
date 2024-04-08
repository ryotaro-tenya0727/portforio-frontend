import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import CircularProgress from '@mui/material/CircularProgress';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import useMedia from 'use-media';

import { Button } from './../atoms/atoms';

import button from './../../css/atoms/button.module.scss';
import card from './../../css/organisms/card.module.css';

const LoginUserDiaryCard = ({
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
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const isWide = useMedia({ minWidth: '700px' });
  return (
    <Grid item xs={12} sm={6}>
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
              <Button className={button.button_card} onClick={returnTop}>
                <AppRegistrationIcon
                  sx={{
                    fontSize: '23px',
                    mb: '-9.5px',
                    mr: '3px',
                    '@media screen and (max-width:600px)': {
                      fontSize: '20.5px',
                      mb: '-7.5px',
                    },
                  }}
                />
                日記の詳細を見る
              </Button>
            </Link>
            <Link to={editUrl}>
              <Button className={button.button_card} onClick={returnTop}>
                日記を編集する
              </Button>
            </Link>
            <img
              src={`${imageDomain}/admin/diary_card_image.png`}
              alt='picture'
              style={{ margin: '-5px 10px 0px 0px' }}
              className={card.recommended_member_card_image}
            />
          </div>
        )}
        <br />
        <p className={card.card_text} style={{ marginTop: '10px' }}>
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
              sx={{ fontSize: '20px', mb: '-3.3px', color: '#3300FF' }}
            />
            &nbsp;&nbsp;日付:
          </span>
          &nbsp;
          {eventDate ? eventDate : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <AccountBalanceIcon
              sx={{ fontSize: '19px', mb: '-2.9px', color: '#00AA00' }}
            />
            &nbsp;&nbsp;会場:
          </span>
          &nbsp;
          {eventVenue ? eventVenue : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>
            <PhotoCameraBackIcon
              sx={{ fontSize: '19px', mb: '-3.5px', color: '#FF8C00' }}
            />
            &nbsp;&nbsp;この日のチェキ数:
          </span>
          &nbsp;
          {eventPolaroidCount ? eventPolaroidCount : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>トップページでの公開:</span>
          &nbsp;
          {status === 'published' ? 'する' : 'しない'}
        </p>
        <div className={card.card_photo_list}>
          {diaryImages === undefined ? (
            <div style={{ textAlign: 'center', padding: '0px 0px 2px 0px' }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                日記作成中
              </p>
              <CircularProgress size={60} />
            </div>
          ) : (
            <>
              {diaryImages.map((diaryImageUrl, index) => {
                return (
                  <Zoom zoomMargin={40}>
                    <img
                      key={index}
                      src={`${diaryImageUrl}`}
                      alt='picture'
                      width={isWide ? '150px' : '120px'}
                      style={{
                        border: '2px solid #ff99c5',
                        borderRadius: '5px',
                      }}
                    />
                  </Zoom>
                );
              })}
            </>
          )}
        </div>
      </Card>
    </Grid>
  );
};

export default LoginUserDiaryCard;
