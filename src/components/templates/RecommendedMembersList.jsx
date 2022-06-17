import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { usePagination } from './../../hooks/usePagination';
import { RecommendedMemberCard } from './../organisms/Organisms';
import list from './../../css/templates/list.module.css';

const RecommendedMembersList = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();

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
    palette: {
      primary: {
        main: '#ff96df',
      },
      secondary: {
        main: '#000',
      },
    },
  });

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const data =
    recommendedMembers === undefined ? { length: 0 } : recommendedMembers.data;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className={list.list}>
      <ThemeProvider theme={theme}>
        <br />
        {isIdle || isLoading ? (
          <p>推しメンローディング中</p>
        ) : (
          <>
            <div className={list.pagination_wrap}>
              <Pagination
                color='primary'
                size='large'
                className={list.pagination}
                count={count}
                page={page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
                onChange={handleChange}
              />
            </div>
            <Grid container spacing={3}>
              {_DATA.currentData().map((recommendedMember, index) => {
                return (
                  <>
                    <RecommendedMemberCard
                      key={index}
                      nickname={recommendedMember.attributes.nickname}
                      group={recommendedMember.group}
                      firstMetDate={recommendedMember.attributes.first_met_date}
                      recommendedMemberId={recommendedMember.attributes.id}
                      totalMemberPolaroidCount={
                        recommendedMember.attributes.total_member_polaroid_count
                      }
                      DiariesCount={recommendedMember.attributes.diaries_count}
                      diaryUrl={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                      editUrl={`/recommended-member/${recommendedMember.attributes.uuid}/edit/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                    />
                  </>
                );
              })}
            </Grid>
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default RecommendedMembersList;
