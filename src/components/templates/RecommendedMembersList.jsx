import { useQueryClient } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { RecommendedMemberCard } from './../organisms/Organisms';
import list from './../../css/templates/list.module.css';

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
        sm: 830,
        md: 1270,
        lg: 1400,
        xl: 1536,
      },
    },
  });

  return (
    <div className={list.list}>
      <ThemeProvider theme={theme}>
        <br />
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
                      recommendedMemberId={recommendedMember.id}
                      totalMemberPolaroidCount={
                        recommendedMember.total_member_polaroid_count
                      }
                      DiariesCount={recommendedMember.diaries_count}
                      diaryUrl={`/recommended-member/${recommendedMember.uuid}/diaries/${recommendedMember.id}?nickname=${recommendedMember.nickname}&group=${recommendedMember.group}`}
                      editUrl={`/recommended-member/${recommendedMember.uuid}/edit/${recommendedMember.id}?nickname=${recommendedMember.nickname}&group=${recommendedMember.group}`}
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
                <RecommendedMemberCard
                  key={index}
                  nickname={recommendedMember.attributes.nickname}
                  group={recommendedMember.attributes.group}
                  firstMetDate={recommendedMember.attributes.first_met_date}
                  recommendedMemberId={recommendedMember.attributes.id}
                  totalMemberPolaroidCount={
                    recommendedMember.attributes.total_member_polaroid_count
                  }
                  DiariesCount={recommendedMember.attributes.diaries_count}
                  diaryUrl={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                  editUrl={`/recommended-member/${recommendedMember.attributes.uuid}/edit/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                />
              );
            })}
          </Grid>
        )}
      </ThemeProvider>
    </div>
  );
};

export default RecommendedMembersList;
