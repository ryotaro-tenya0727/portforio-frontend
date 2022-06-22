import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CircularProgress from '@mui/material/CircularProgress';

import { LoginUserDiaryCard } from './../organisms/Organisms';
import list from './../../css/templates/list.module.css';
import { usePagination } from './../../hooks/usePagination';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

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

  // 検索
  const [searchText, setSearchText] = useState('');
  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    // 検索フィールドが空の場合、ここに入らない
    data = recommendedMemberDiaries.data.filter((diary) =>
      searchKeywords.every(
        (kw) => diary.attributes.event_name.indexOf(kw) !== -1
      )
    );
  }

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
  // isIdle || isLoading
  return (
    <div className={list.list}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <h2>{recommendedMemberNickname}の日記一覧</h2>
        {isIdle || isLoading ? (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <br />
            <CircularProgress
              size={130}
              sx={{ mt: '100px', color: '#ff7bd7' }}
            />
          </div>
        ) : (
          <>
            <div className={list.pagination_and_search_wrap}>
              <Pagination
                sx={{ mt: '15px' }}
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
              <div style={{ marginTop: '15px' }}>
                <SavedSearchIcon
                  sx={{
                    fontSize: 40,
                    mb: -1.7,
                    mr: 1,
                    color: 'secondary.main',
                  }}
                />
                <input
                  className={list.member_search_form}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeHolder={'イベント名で検索'}
                />
              </div>
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
                    showUrl={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/show/${diary.attributes.id}?recommended_member_nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`}
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
