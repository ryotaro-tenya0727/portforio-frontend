import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import TwitterIcon from '@mui/icons-material/Twitter';

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
          <CircularProgress
            size={150}
            sx={{ mt: '150px', color: '#ff7bd7', ml: '70px' }}
          />
          <p style={{ fontSize: '22px' }}>ロード中</p>
        </div>
      ) : (
        <>
          <p style={{ textAlign: 'center', marginLeft: '50px' }}>
            <ThemeProvider theme={theme2}>
              <Button
                variant='contained'
                color='secondary'
                sx={{ width: '160px', mt: 1, mb: 2 }}
                href={`https://twitter.com/intent/tweet?text=%0a${
                  recommended_member_diary_show.data.attributes
                    .diary_member_nickname
                }との思い出%0ahttps://www.oshi-diary.com/diaries/show/${
                  recommended_member_diary_show.data.attributes.id
                }?name=${encodeURI(
                  encodeURI(
                    recommended_member_diary_show.data.attributes
                      .diary_member_nickname
                  )
                )}`}
                target='_blank'
              >
                <TwitterIcon sx={{ mr: 1.5, mb: 0.1 }} />
                ツイートする
              </Button>
              <p style={{ textAlign: 'center', marginRight: '50px' }}>
                {' '}
                (推しの名前が入った画像がツイートできます)
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
