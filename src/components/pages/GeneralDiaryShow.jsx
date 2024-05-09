import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import CircularProgress from '@mui/material/CircularProgress';
import HomeIcon from '@mui/icons-material/Home';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { Button } from './../atoms/atoms';

import { Circular, StreamingVideo } from './../atoms/atoms';
import { useGeneralDiariesApi } from './../../hooks/useGeneralDiary';
import diary from './../../css/templates/diary.module.css';
import button from './../../css/atoms/button.module.scss';

const GeneralDiaryShow = () => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const { diary_id } = useParams();
  const { useShowGeneralDiaries } = useGeneralDiariesApi();

  let {
    data: general_diary_show,
    isIdle,
    isLoading,
  } = useShowGeneralDiaries(diary_id);

  return (
    <>
      {isIdle || isLoading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <CircularProgress
            size={150}
            sx={{ mt: '150px', color: '#ff7bd7', mb: '30px' }}
          />
          <p style={{ fontSize: '22px' }}>ロード中</p>
        </div>
      ) : (
        <>
          <Link to='/'>
            <Button className={button.recommended_and_diary_button}>
              <HomeIcon
                sx={{
                  fontSize: '16px',
                  mb: '-4.5px',
                  mr: '5px',
                  color: '#ff64db',
                  '@media screen and (min-width:700px)': {
                    fontSize: '22px',
                    mb: -1,
                    mr: 1,
                  },
                }}
              />
              トップページへ
            </Button>
          </Link>
          <Link style={{ marginLeft: '15px' }} to='/timeline'>
            <Button className={button.recommended_and_diary_button}>
              <SpeakerNotesIcon
                sx={{
                  color: '#ff66d1',
                  fontSize: '16px',
                  mr: 0.4,
                  mb: -0.5,
                  '@media screen and (min-width:700px)': {
                    fontSize: '22px',
                    mb: -1,
                    mr: 1,
                  },
                }}
              />
              タイムラインへ
            </Button>
          </Link>
          <div
            className={diary.diary_show_wrapper}
            style={{
              backgroundImage: `url(${imageDomain}/admin/diary-melody-min.png)`,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src={`${imageDomain}/admin/diary_header-min.png`}
                alt='picture'
                className={diary.diary_header_image}
              />
            </div>
            <div style={{ padding: '0px 15px 15px 15px' }}>
              <p className={diary.diary_member_title}>
                <img
                  src={`${imageDomain}/admin/diary_title-min.png`}
                  alt='picture'
                  className={diary.diary_member_title_icon}
                />
                {general_diary_show.data.attributes.diary_user}
                さんと
                {general_diary_show.data.attributes.diary_member_nickname}（
                {general_diary_show.data.attributes.diary_member_group}
                ）の日記
              </p>

              <div className={diary.diary_sub_text_wrapper}>
                <span className={diary.diary_sub_text}>
                  <span className={diary.diary_sub_text_property}>
                    <LibraryMusicIcon
                      sx={{
                        color: 'red',
                        '@media screen and (max-width:600px)': {
                          fontSize: '21.5px',
                        },
                      }}
                      className={diary.diary_sub_text_icon}
                    />
                    イベント名：
                  </span>
                  {general_diary_show.data.attributes.event_name}
                </span>
                <img
                  src={`${imageDomain}/admin/polaroid-camera-min.png`}
                  alt='picture'
                  className={diary.diary_polaroid_image}
                />
              </div>
              <p className={diary.diary_sub_text_wrapper}>
                <span className={diary.diary_sub_text}>
                  <span className={diary.diary_sub_text_property}>
                    <CalendarMonthIcon
                      sx={{
                        color: '#3300FF',
                        '@media screen and (max-width:600px)': {
                          fontSize: '21.5px',
                        },
                      }}
                      className={diary.diary_sub_text_icon}
                    />
                    日付：
                  </span>
                  {general_diary_show.data.attributes.event_date}
                </span>
              </p>
              <p className={diary.diary_sub_text_wrapper}>
                <span className={diary.diary_sub_text}>
                  <span className={diary.diary_sub_text_property}>
                    <AccountBalanceIcon
                      sx={{
                        color: '#00AA00',
                        '@media screen and (max-width:600px)': {
                          fontSize: '21.5px',
                        },
                      }}
                      className={diary.diary_sub_text_icon}
                    />
                    イベント会場：
                  </span>
                  {general_diary_show.data.attributes.event_venue}
                </span>
              </p>
              <p className={diary.diary_sub_text_wrapper}>
                <span className={diary.diary_sub_text}>
                  <span className={diary.diary_sub_text_property}>
                    <PhotoCameraBackIcon
                      sx={{
                        color: '#FF8C00',
                        '@media screen and (max-width:600px)': {
                          fontSize: '21.5px',
                        },
                      }}
                      className={diary.diary_sub_text_icon}
                    />
                    この日のチェキ数：
                  </span>
                  {general_diary_show.data.attributes.event_polaroid_count}
                  枚のチェキを撮影
                </span>
              </p>

              <p className={diary.diary_sub_text_wrapper}>
                <span className={diary.diary_sub_text}>
                  <span className={diary.diary_sub_text_property}>
                    <img
                      src={`${imageDomain}/admin/diary_heart.png`}
                      alt='picture'
                      className={diary.diary_sub_text_icon}
                      style={{ marginTop: '7px' }}
                    />
                    印象に残った出来事：
                  </span>
                  {general_diary_show.data.attributes.impressive_memory}
                </span>
              </p>

              <div className={diary.diary_sub_text_wrapper}>
                <span className={diary.diary_sub_text}>
                  <p className={diary.diary_sub_text_property}>
                    印象に残った出来事の詳細：
                  </p>

                  <span
                    style={{
                      lineHeight: '38px',
                    }}
                  >
                    {
                      general_diary_show.data.attributes
                        .impressive_memory_detail
                    }
                  </span>
                </span>
              </div>

              {(() => {
                if (
                  general_diary_show.data.attributes.diary_images.length > 0
                ) {
                  return (
                    <div className={diary.diary_images}>
                      {general_diary_show.data.attributes.diary_images.map(
                        (diaryImageUrl, index) => {
                          return (
                            <Zoom zoomMargin={40} key={index}>
                              <img
                                src={`${diaryImageUrl}`}
                                alt='picture'
                                className={diary.diary_image}
                              />
                            </Zoom>
                          );
                        }
                      )}
                    </div>
                  );
                } else if (general_diary_show.data.attributes.diary_video_uid) {
                  return (
                    <StreamingVideo
                      videoUid={
                        general_diary_show.data.attributes.diary_video_uid
                      }
                      width={400}
                    />
                  );
                } else {
                  return;
                }
              })()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GeneralDiaryShow;
