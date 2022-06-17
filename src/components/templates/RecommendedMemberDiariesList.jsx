import { ReactQueryDevtools } from 'react-query/devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { LoginUserDiaryCard } from './../organisms/Organisms';
import list from './../../css/templates/list.module.css';

const RecommendedMemberDiariesList = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const { useGetRecommendedMemberDiaries } = useRecommendedMemberDiariesApi();

  const {
    data: recommendedMemberDiaries,
    isIdle,
    isLoading,
  } = useGetRecommendedMemberDiaries(recommendedMemberId);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 855,
        md: 1290,
        lg: 1400,
        xl: 1536,
      },
    },
  });

  return (
    <div className={list.list}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <h2>{recommendedMemberNickname}の日記一覧</h2>
        {isIdle || isLoading ? (
          <h2>日記ローディング中</h2>
        ) : (
          <Grid container spacing={3}>
            {recommendedMemberDiaries.data.map((diary, index) => {
              return (
                <LoginUserDiaryCard
                  key={index}
                  diaryId={diary.attributes.id}
                  eventName={diary.attributes.event_name}
                  eventDate={diary.attributes.event_date}
                  eventVenue={diary.attributes.event_venue}
                  status={diary.attributes.status}
                  diaryImages={diary.attributes.diary_images}
                  eventPolaroidCount={diary.attributes.event_polaroid_count}
                  showUrl={`/recommended-member/${recommendedMemberUuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  editUrl={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/edit/${diary.attributes.id}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                />
              );
            })}
          </Grid>
        )}
      </ThemeProvider>
    </div>
  );
};

export default RecommendedMemberDiariesList;
