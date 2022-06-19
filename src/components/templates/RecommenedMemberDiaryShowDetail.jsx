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

  return (
    <>
      {isIdle || isLoading ? (
        <h2>日記ローディング中</h2>
      ) : (
        <>
          <div className={diary.diary_show_wrapper}>
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
                  className={diary.diary_text_icon}
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

              <p className={diary.diary_show_text_wrapper}>
                <span className={diary.diary_show_text}>
                  <span className={diary.diary_show_text_property}>
                    イベント名：
                  </span>
                  {recommended_member_diary_show.data.attributes.event_name}
                </span>
              </p>
              <p className={diary.diary_show_text_wrapper}>
                <span className={diary.diary_show_text}>
                  <span className={diary.diary_show_text_property}>日付：</span>
                  {recommended_member_diary_show.data.attributes.event_date}
                </span>
              </p>
              <p className={diary.diary_show_text_wrapper}>
                <span className={diary.diary_show_text}>
                  <span className={diary.diary_show_text_property}>
                    イベント会場：
                  </span>
                  {recommended_member_diary_show.data.attributes.event_venue}
                </span>
              </p>
              <p className={diary.diary_show_text_wrapper}>
                <span className={diary.diary_show_text}>
                  <span className={diary.diary_show_text_property}>
                    この日のチェキ数：
                  </span>
                  {
                    recommended_member_diary_show.data.attributes
                      .event_polaroid_count
                  }
                </span>
              </p>

              <p className={diary.diary_show_text_wrapper}>
                <span className={diary.diary_show_text}>
                  <span className={diary.diary_show_text_property}>
                    印象に残った出来事：
                  </span>
                  {
                    recommended_member_diary_show.data.attributes
                      .impressive_memory
                  }
                </span>
              </p>

              <p className={diary.diary_show_text_wrapper}>
                <span className={diary.diary_show_text}>
                  <span className={diary.diary_show_text_property}>
                    印象に残った出来事の詳細：
                  </span>

                  <p
                    style={{
                      lineHeight: '38px',
                      marginTop: '10px',
                      borderBottom: '3px',
                    }}
                  >
                    {
                      recommended_member_diary_show.data.attributes
                        .impressive_memory_detail
                    }
                  </p>
                </span>
              </p>

              <>
                {recommended_member_diary_show.data.attributes.diary_images.map(
                  (diaryImageUrl, index) => {
                    return (
                      <img
                        key={index}
                        src={`${diaryImageUrl}`}
                        alt='picture'
                        width='150'
                        height='150'
                        style={{ border: '4px solid #ff99c5' }}
                      />
                    );
                  }
                )}
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecommenedMemberDiaryShowDetail;
