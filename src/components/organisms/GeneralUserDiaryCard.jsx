import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { Button } from './../atoms/atoms';

import button from './../../css/atoms/button.module.scss';
import card from './../../css/organisms/card.module.css';

const GeneralUserDiaryCard = ({
  diaryUserName,
  diaryUserImage,
  DiaryMemberNickname,
  eventName,
  eventPolaroidCount,
  diaryImages,
  ImpressiveMemory,
  showUrl,
  videoThumbnailUrl,
}) => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const diaryImageUrl = diaryImages[0];
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Card
      className={card.card_general_whole}
      sx={{
        boxShadow:
          'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
        border: '1px solid #ff66d1',
      }}
    >
      <div className={card.card_diary_button_list}>
        <p className={card.card_general_title}>
          {DiaryMemberNickname}との思い出
        </p>
        <Link to={showUrl}>
          <Button className={button.buttonCard} onClick={returnTop}>
            <AppRegistrationIcon
              sx={{
                fontSize: '25px',
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

        <img
          src={`${imageDomain}/admin/diary_card_image.png`}
          alt='picture'
          width='120'
          style={{ margin: '0px 10px 0px 0px' }}
          className={card.recommended_member_card_image}
        />
      </div>
      <div className={card.user_info}>
        <img
          src={`${diaryUserImage}`}
          alt='picture'
          className={card.card_general_photo}
          style={{
            border: '2px solid #ff99c5',
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        ユーザーネーム:&emsp;<strong>{diaryUserName}</strong>
      </div>
      <div className={card.card_general_detail}>
        <div className={card.card_general_text_wrapper}>
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
              <PhotoCameraBackIcon
                sx={{ fontSize: '19px', mb: '-3.5px', color: '#FF8C00' }}
              />
              &nbsp;&nbsp;チェキ数:
            </span>
            &nbsp;
            {eventPolaroidCount ? eventPolaroidCount : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>
              <img
                src={`${imageDomain}/admin/diary_heart.png`}
                alt='picture'
                width='22'
                style={{ marginTop: '-1px' }}
              />
              &nbsp;&nbsp;出来事:
            </span>
            &emsp;{ImpressiveMemory ? ImpressiveMemory : '未入力'}
          </p>
        </div>
        {diaryImageUrl && (
          <div class={card.general_diary_image}>
            <Zoom zoomMargin={40}>
              <img
                src={`${diaryImageUrl}`}
                alt='picture'
                width='130'
                height='173'
                style={{
                  border: '2px solid #ff99c5',
                  borderRadius: '5px',
                }}
              />
            </Zoom>
          </div>
        )}
        {videoThumbnailUrl && (
          <div class={card.general_diary_image}>
            <Zoom zoomMargin={40}>
              <img
                src={`${videoThumbnailUrl}`}
                alt='picture'
                width='130'
                style={{
                  border: '2px solid #ff99c5',
                  borderRadius: '5px',
                  marginBottom: '50%',
                }}
              />
            </Zoom>
          </div>
        )}
        {!videoThumbnailUrl && !diaryImageUrl && (
          <div class={card.dummy_general_diary_image}></div>
        )}
      </div>
    </Card>
  );
};

export default GeneralUserDiaryCard;
