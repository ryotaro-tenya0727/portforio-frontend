import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { usePagination } from './../../hooks/usePagination';
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

  // ページネーション
  let [page, setPage] = useState(1);
  const PER_PAGE = 2;
  let data =
    recommendedMemberDiaries === undefined
      ? { length: 0 }
      : recommendedMemberDiaries.data;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (_e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

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
    palette: {
      primary: {
        main: '#ff96df',
      },
      secondary: {
        main: '#DC143C',
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
          <>
            <div className={list.pagination_and_search_wrap}>
              <Pagination
                sx={{ margin: '0 auto' }}
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
              {_DATA.currentData().map((diary, index) => {
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
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default RecommendedMemberDiariesList;
