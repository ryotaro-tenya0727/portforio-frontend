import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Card from '@mui/material/Card';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import useMedia from 'use-media';

import { Button, LikeButton, UnLikeButton } from './../atoms/atoms';

import button from './../../css/atoms/button.module.scss';
import card from './../../css/organisms/card.module.css';

const TimeLineCard = ({
  diaryId,
  diaryUserName,
  diaryUserImage,
  DiaryMemberNickname,
  eventName,
  eventDate,
  eventVenue,
  eventPolaroidCount,
  diaryImage,
  showUrl,
  me,
  liked,
}) => {
  const [LikedState, setLikedState] = useState(liked);
  const { loginWithRedirect } = useAuth0();
  const isWide = useMedia({ minWidth: '700px' });
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Card
      style={{
        maxWidth: '600px',
        width: '90%',
        marginBottom: '25px',
      }}
      className={card.card_whole}
      sx={{
        boxShadow:
          'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
      }}
    >
      <div className={card.timeline}>
        <div style={{ flex: 4 }}>
          <div className={card.card_diary_button_list}>
            <p className={card.card_general_title}>
              {DiaryMemberNickname}との思い出
            </p>
            <p
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Link to={showUrl}>
                <Button className={button.buttonCard} onClick={returnTop}>
                  <AppRegistrationIcon
                    sx={{
                      fontSize: '25px',
                      mb: '-9.5px',
                      mr: '3px',
                      '@media screen and (max-width:700px)': {
                        fontSize: '20.5px',
                        mb: '-7.5px',
                      },
                    }}
                  />
                  日記の詳細を見る
                </Button>
              </Link>
              <p className={card.like_text}>
                {' '}
                {me ? (
                  <></>
                ) : (
                  <p>
                    {LikedState === 'Not Loggin' ? (
                      <>
                        <input
                          type='submit'
                          value={`いいね`}
                          className={button.like}
                          onClick={() => {
                            loginWithRedirect();
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {LikedState ? (
                          <UnLikeButton
                            id={diaryId}
                            changeLike={setLikedState}
                          />
                        ) : (
                          <LikeButton id={diaryId} changeLike={setLikedState} />
                        )}
                      </>
                    )}
                  </p>
                )}
              </p>
            </p>
          </div>
          <div className={card.user_info}>
            <img
              src={`${diaryUserImage}`}
              alt='picture'
              // width='50'
              className={card.card_general_photo}
              style={{
                border: '2px solid #ff99c5',
                borderRadius: '50%',
                marginRight: '5px',
              }}
            />
            &emsp;<strong>{diaryUserName}</strong>
          </div>

          <p className={card.card_text} style={{ marginTop: '20px' }}>
            <span className={card.card_text_property}>
              <LibraryMusicIcon
                sx={{
                  fontSize: '17px',
                  mb: '-5px',
                  color: 'red',
                  '@media screen and (min-width:700px)': {
                    fontSize: '19px',
                    mb: '-7.5px',
                  },
                }}
              />
              &nbsp;&nbsp;イベント名:
            </span>
            &nbsp;
            {eventName ? eventName : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>
              <AccountBalanceIcon
                sx={{
                  fontSize: '17px',
                  mb: '-5px',
                  color: '#00AA00',
                  '@media screen and (min-width:700px)': {
                    fontSize: '19px',
                    mb: '-7.5px',
                  },
                }}
              />
              &nbsp;&nbsp;会場:
            </span>
            &nbsp;
            {eventVenue ? eventVenue : '未入力'}
          </p>
          <p className={card.card_text}>
            <span className={card.card_text_property}>
              <PhotoCameraBackIcon
                sx={{
                  fontSize: '17px',
                  mb: '-5px',
                  color: '#FF8C00',
                  '@media screen and (min-width:700px)': {
                    fontSize: '19px',
                    mb: '-7.5px',
                  },
                }}
              />
              &nbsp;&nbsp;この日のチェキ数:
            </span>
            &nbsp;
            {eventPolaroidCount ? eventPolaroidCount : '未入力'}
          </p>
        </div>
        {diaryImage === null ? (
          <div
            style={{
              flex: 3,
              marginTop: isWide ? '120px' : '120px',
              textAlign: 'center',
              fontSize: isWide ? '17px' : '13px',
            }}
          >
            写真の投稿待ち。
          </div>
        ) : (
          <div
            style={{
              flex: 3,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                display: 'inline-block',
                justifyContent: 'flex-end',
                borderBottom: '2px dashed #ff8a8a',
                fontSize: isWide ? '17px' : '13px',
                float: 'right',
              }}
            >
              <CalendarMonthIcon
                sx={{
                  fontSize: '17px',
                  mb: -0.4,
                  mr: 1,
                  color: '#3300FF',
                  '@media screen and (min-width:700px)': {
                    fontSize: '20.5px',
                    mb: -0.45,
                  },
                }}
              />
              {eventDate ? eventDate : '未入力'}
            </p>
            <p
              style={{
                marginTop: isWide ? '75px' : '75px',
                fontSize: isWide ? '17px' : '13px',
                textAlign: 'center',
                marginLeft: isWide ? '20px' : '12px',
              }}
            >
              思い出の写真
            </p>

            <p
              style={{
                marginTop: '5px',
              }}
            >
              <Zoom zoomMargin={40}>
                <img
                  src={`${diaryImage}`}
                  alt='picture'
                  width={isWide ? '150px' : '120px'}
                  height={isWide ? '201px' : '160.8px'}
                  style={{
                    border: '2px solid #ff99c5',
                    borderRadius: '5px',
                    marginLeft: isWide ? '20px' : '12px',
                  }}
                />
              </Zoom>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TimeLineCard;
