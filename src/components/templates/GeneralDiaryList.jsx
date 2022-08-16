import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper';
import CircularProgress from '@mui/material/CircularProgress';

import { GeneralUserDiaryCard } from './../organisms/Organisms';
import { useGeneralDiariesApi } from '../../hooks/useGeneralDiary';
import generalDiaryList from './../../css/templates/generalDiaryList.module.css';

import 'swiper/css';

const GeneralDiaryList = () => {
  const { useGetGeneralDiaries } = useGeneralDiariesApi();
  const { data: generalDiaries, isLoading, isIdle } = useGetGeneralDiaries();

  return isIdle || isLoading ? (
    <div className={generalDiaryList.loading}>
      <CircularProgress size={130} sx={{ mt: '50px', color: '#ff7bd7' }} />
    </div>
  ) : (
    <div className={generalDiaryList.wrapper}>
      <Swiper
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 40,
          modifier: 3,
          slideShadows: false,
        }}
        spaceBetween={20}
        loop={true}
        speed={2000}
        initialSlide={3}
        slidesPerView={1}
        autoplay={{
          delay: 1000,
        }}
        breakpoints={{
          850: {
            slidesPerView: 2,
          },
        }}
        preventInteractionOnTransition={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {generalDiaries.data.map((diary, index) => {
          return (
            <SwiperSlide>
              <GeneralUserDiaryCard
                key={index}
                diaryId={diary.attributes.id}
                diaryUserName={diary.attributes.diary_user_name}
                diaryUserImage={diary.attributes.diary_user_image}
                eventName={diary.attributes.event_name}
                eventDate={diary.attributes.event_date}
                eventVenue={diary.attributes.event_venue}
                DiaryMemberNickname={diary.attributes.diary_member_nickname}
                diaryImages={diary.attributes.diary_images}
                eventPolaroidCount={diary.attributes.event_polaroid_count}
                ImpressiveMemory={diary.attributes.impressive_memory}
                showUrl={`/diaries/show/${diary.attributes.id}}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default GeneralDiaryList;
