import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import useMedia from 'use-media';

import { Button, Circular } from './../atoms/atoms';
import { RecommendedMemberCard } from './../organisms/Organisms';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { usePagination } from './../../hooks/usePagination';

import button from './../../css/atoms/button.module.scss';
import list from './../../css/templates/list.module.css';

const RecommendedMembersList = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();
  const isWide = useMedia({ minWidth: '700px' });
  const { data: recommendedMembers, isLoading } = useGetRecommendedMembers();

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  // ページネーション
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  let data =
    recommendedMembers === undefined ? [{ length: 0 }] : recommendedMembers;

  // 検索
  const [searchText, setSearchText] = useState('');
  // 検索フィールドが空の場合、ここに入らない
  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = recommendedMembers.filter((member) =>
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
        sm: 950,
        md: 1370,
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
      <ThemeProvider theme={theme}>
        {isLoading ? (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Circular large={80} small={60} top={120} />
          </div>
        ) : (
          <>
            <br />
            <div className={list.pagination_and_search_wrap}>
              <Pagination
                color='primary'
                sx={{
                  fontSize: 40,
                  mb: -0.5,
                  mt: -1.5,
                  '@media screen and (max-width:500px)': {
                    fontSize: 35,
                    mb: -0.5,
                    mt: -3.5,
                  },
                }}
                size={isWide ? 'medium' : 'small'}
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
                    '@media screen and (max-width:500px)': {
                      fontSize: 35,
                    },
                  }}
                />
                <input
                  className={list.member_search_form}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={'推しメンの名前で検索'}
                />
              </div>
            </div>
            {_DATA.currentData().length === 0 && (
              <>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  現在推しメンが登録されていません。
                  <p>
                    {' '}
                    <Link to='/recommended-members/new'>
                      <Button
                        className={button.recommended_and_diary_button}
                        onClick={returnTop}
                      >
                        <LoyaltyIcon
                          sx={{
                            fontSize: '18.5px',
                            mr: 0.5,
                            mb: '-3.5px',
                            color: '#ff6fc8',
                            '@media screen and (max-width:700px)': {
                              fontSize: '14.5px',
                              mr: 0.5,
                            },
                          }}
                        />
                        推しメン登録ページへ
                      </Button>
                    </Link>
                  </p>
                </div>
              </>
            )}
            <Grid container spacing={3}>
              {_DATA.currentData().map((recommendedMember, index) => {
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
                    NumberOfDays={recommendedMember.attributes.number_of_days}
                    diaryUrl={`/recommended-member/${recommendedMember.attributes.uuid}/diaries/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
                    editUrl={`/recommended-member/${recommendedMember.attributes.uuid}/edit/${recommendedMember.attributes.id}?nickname=${recommendedMember.attributes.nickname}&group=${recommendedMember.attributes.group}`}
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

export default RecommendedMembersList;
