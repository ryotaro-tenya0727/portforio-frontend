import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CircularProgress from '@mui/material/CircularProgress';

import { RecommendedMemberCard } from './../organisms/Organisms';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { usePagination } from './../../hooks/usePagination';
import list from './../../css/templates/list.module.css';

const RecommendedMembersList = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();

  const {
    data: recommendedMembers,
    isLoading,
    isIdle,
  } = useGetRecommendedMembers();

  // ページネーション
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  let data =
    recommendedMembers === undefined ? { length: 0 } : recommendedMembers.data;

  // 検索
  const [searchText, setSearchText] = useState('');
  // 検索フィールドが空の場合、ここに入らない
  const searchKeywords = searchText
    .trim()
    .toLowerCase()
    .match(/[^\s]+/g);

  if (searchKeywords !== null) {
    data = recommendedMembers.data.filter((member) =>
      searchKeywords.every(
        (kw) => member.attributes.nickname.indexOf(kw) !== -1
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
        sm: 850,
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
        main: '#DC143C',
      },
    },
  });
  // isIdle || isLoading
  return (
    <div className={list.list}>
      <ThemeProvider theme={theme}>
        {isIdle || isLoading ? (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 auto',
                marginTop: '55px',
                marginBottom: '30px',
                width: '200px',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              推しメン情報ロード中
            </p>
            <br />
            <CircularProgress size={120} />
          </div>
        ) : (
          <>
            <br />
            <div className={list.pagination_and_search_wrap}>
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

              <div>
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
                  placeHolder={'推しメンの名前で検索'}
                />
              </div>
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
