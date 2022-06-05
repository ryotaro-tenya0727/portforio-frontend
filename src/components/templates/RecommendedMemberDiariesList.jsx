import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { LoginUserDiaryCard } from './../organisms/Organisms';

const RecommendedMemberDiariesList = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const { useGetRecommendedMemberDiaries } = useRecommendedMemberDiariesApi();
  const queryClient = useQueryClient();
  const recommendedMemberDiaries_data = queryClient.getQueryData([
    'recommended_member_diaries',
    { recommendedMemberId: recommendedMemberId },
  ]);

  const {
    data: recommendedMemberDiaries,
    isIdle,
    isLoading,
  } = useGetRecommendedMemberDiaries(recommendedMemberId);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <h2>{recommendedMemberNickname}の日記一覧</h2>
        {recommendedMemberDiaries_data === undefined ? (
          isIdle || isLoading ? (
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
                    eventPolaroidCount={diary.attributes.event_polaroid_count}
                    showUrl={`/recommended-member/${recommendedMemberUuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                    editUrl={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/edit/${diary.attributes.id}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  />
                  //               <p key={index}>
                  //   {diary.attributes.diary_member_nickname}
                  //   <br />
                  //   {diary.attributes.event_name}:{diary.attributes.event_venue}
                  //   <br />
                  //   <Link
                  //     to={`/recommended-member/${recommendedMemberUuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  //   >
                  //     日記詳細
                  //   </Link>
                  //   <br />
                  //   <Link
                  //     to={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/edit/${diary.attributes.id}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  //   >
                  //     日記を編集
                  //   </Link>
                  // </p>
                );
              })}
            </Grid>
          )
        ) : (
          <Grid container spacing={3}>
            {recommendedMemberDiaries_data.data.map((diary, index) => {
              return (
                <LoginUserDiaryCard
                  key={index}
                  diaryId={diary.attributes.id}
                  eventName={diary.attributes.event_name}
                  eventDate={diary.attributes.event_date}
                  eventVenue={diary.attributes.event_venue}
                  eventPolaroidCount={diary.attributes.event_polaroid_count}
                  showUrl={`/recommended-member/${recommendedMemberUuid}/diaries/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                  editUrl={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/edit/${diary.attributes.id}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
                />
              );
            })}
          </Grid>
        )}
      </ThemeProvider>
    </>
  );
};

export default RecommendedMemberDiariesList;
