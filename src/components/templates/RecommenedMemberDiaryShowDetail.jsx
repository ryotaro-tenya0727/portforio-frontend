import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

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
  console.log(recommended_member_diary_show);
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
                （
                {
                  recommended_member_diary_show.data.attributes
                    .diary_member_group
                }
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
                      <Zoom zoomMargin={40}>
                        <img
                          key={index}
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
