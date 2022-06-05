import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { RecommendedMemberCard } from './../organisms/Organisms';

const RecommendedMembersList = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();
  const queryClient = useQueryClient();
  const recommendedMembers_data = queryClient.getQueryData(
    'recommended_members'
  );

  const {
    data: recommendedMembers,
    isLoading,
    isIdle,
  } = useGetRecommendedMembers();

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
      <ThemeProvider theme={theme}>
        <h2>推しメン一覧</h2>
        {recommendedMembers_data === undefined ? (
          isIdle || isLoading ? (
            <p>推しメンローディング中</p>
          ) : (
            <Grid container spacing={3}>
              {recommendedMembers.data.map((recommendedMember, index) => {
                return (
                  <>
                    {(recommendedMember = recommendedMember.attributes)}
                    <RecommendedMemberCard
                      key={index}
                      nickname={recommendedMember.nickname}
                      group={recommendedMember.group}
                      firstMetDate={recommendedMember.first_met_date}
                      recommendedMemberUuid={recommendedMember.uuid}
                      totalMemberPolaroidCount={
                        recommendedMember.total_member_polaroid_count
                      }
                      diaryUrl={`/recommended-member/${recommendedMember.uuid}/diaries/${recommendedMember.id}?nickname=${recommendedMember.nickname}&group=${recommendedMember.group}`}
                      editUrl={`/recommended-member/${recommendedMember.uuid}/edit/${recommendedMember.id}?nickname=${recommendedMember.nickname}&group=${recommendedMember.group}`}
                      isLoading={isLoading}
                    />
                  </>
                );
              })}
            </Grid>
          )
        ) : (
          <Grid container spacing={3}>
            {recommendedMembers_data.data.map((recommendedMember, index) => {
              return (
                <>
                  <RecommendedMemberCard
                    key={index}
                    nickname={recommendedMember.attributes.nickname}
                    group={recommendedMember.attributes.group}
                    firstMetDate={recommendedMember.attributes.first_met_date}
                    recommendedMemberUuid={recommendedMember.attributes.uuid}
                    totalMemberPolaroidCount={
                      recommendedMember.attributes.total_member_polaroid_count
                    }
                    diaryUrl={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                    editUrl={`/recommended-member/${recommendedMember.attributes.uuid}/edit/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                    isLoading={isLoading}
                  />
                </>
              );
            })}
          </Grid>
        )}
      </ThemeProvider>
    </>
  );
};

export default RecommendedMembersList;
