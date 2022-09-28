import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import TwitterIcon from '@mui/icons-material/Twitter';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { Circular } from './../atoms/atoms';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import diary from './../../css/templates/diary.module.css';

const RecommenedMemberDiaryShowDetail = ({ diaryId }) => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const { useShowRecommendedMemberDiary } = useRecommendedMemberDiariesApi();

  let {
    data: recommended_member_diary_show,
    isIdle,
    isLoading,
  } = useShowRecommendedMemberDiary(diaryId);

  const theme2 = createTheme({
    palette: {
      secondary: {
        main: '#1D9BF0',
      },
    },
  });

  // isIdle || isLoading
  return (
    <>
      {isIdle || isLoading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Circular large={80} small={50} top='150px' />
        </div>
      ) : (
        <>
          <p style={{ textAlign: 'center' }}>
            <ThemeProvider theme={theme2}>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  mx: 'auto',
                  width: '135px',
                  fontSize: '10px',
                  mt: 2.5,
                  mb: 2,
                  '@media screen and (min-width:500px)': {
                    width: '150px',
                    fontSize: '13.5px',
                  },
                  '@media screen and (min-width:700px)': {
                    width: '160px',
                    fontSize: '13.5px',
                  },
                }}
                href={`https://twitter.com/intent/tweet?text=%0a${
                  recommended_member_diary_show.data.attributes
                    .diary_member_nickname
                }との思い出%0a%23${
                  recommended_member_diary_show.data.attributes
                    .diary_member_nickname
                }%0a%23推しだいありー%0ahttps://www.oshi-diary.com/diaries/show/${
                  recommended_member_diary_show.data.attributes.id
                }?name=${encodeURI(
                  encodeURI(
                    recommended_member_diary_show.data.attributes
                      .diary_member_nickname
                  )
                )}`}
                target='_blank'
              >
                <TwitterIcon
                  sx={{
                    fontSize: 25,
                    mr: 1,
                    '@media screen and (max-width:500px)': {
                      fontSize: 19,
                    },
                  }}
                />
                ツイートする
              </Button>
              <p className={diary.tweet_text}>
                (推しの名前が入った画像をツイートできます)
              </p>
            </ThemeProvider>
          </p>
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
                {recommended_member_diary_show.data.attributes.diary_user}
                さんと
                {
                  recommended_member_diary_show.data.attributes
                    .diary_member_nickname
                }
                の日記
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
                  {recommended_member_diary_show.data.attributes.event_name}
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
                  {recommended_member_diary_show.data.attributes.event_date}
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
                  {recommended_member_diary_show.data.attributes.event_venue}
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
                  {
                    recommended_member_diary_show.data.attributes
                      .event_polaroid_count
                  }
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
                  {
                    recommended_member_diary_show.data.attributes
                      .impressive_memory
                  }
                </span>
              </p>

              <p className={diary.diary_sub_text_wrapper}>
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
                      recommended_member_diary_show.data.attributes
                        .impressive_memory_detail
                    }
                  </span>
                </span>
              </p>

              <div className={diary.diary_images}>
                {recommended_member_diary_show.data.attributes.diary_images.map(
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecommenedMemberDiaryShowDetail;
