import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';

import useMedia from 'use-media';

import { TimeLineCard } from './../organisms/Organisms';
import { API_URL } from '../../urls/index';

const TimeLineList = ({ isAuthenticated }) => {
  const isWide = useMedia({ minWidth: '700px' });
  const [diaries, setDiaries] = useState([]);
  const { accessToken, setAccessToken } = useContext(AuthGuardContext);
  const { getAccessTokenSilently } = useAuth0();
  // const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  let { isLoading: queryLoading, data: time_lines } = useQuery(
    ['time_lines'],
    async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
      setAccessToken(token);
      const response = await axios
        .get(`${API_URL}/api/v1/user/timeline?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          console.error(error.response.data);
        });
      return response.data.data;
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
    }
  );

  const loadMore = async (page) => {
    // const response = await fetch(`http://localhost:3000/api/test?page=${page}`); //API通信
    await axios
      .get(`${API_URL}/api/v1/user/timeline?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data.data;
        //データ件数が0件の場合、処理終了
        if (data.length < 1) {
          setHasMore(false);
          return;
        }
        setDiaries([...diaries, ...data]);
      })
      .catch((error) => {
        console.error(error.response.data);
      });

    //取得データをリストに追加
  };
  const loader = (
    <div style={{ textAlign: 'center', marginTop: '150px' }}>
      <CircularProgress
        sx={{
          color: '#ff94df',
          mt: -0.4,
          fontSize: '80px',
          '@media screen and (min-width:700px)': {
            mt: -1,
          },
        }}
        size={isWide ? 60 : 30}
      />
    </div>
  );
  if (queryLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '150px' }}>
        <CircularProgress
          sx={{
            color: '#ff94df',
            mt: -1,
            fontSize: '80px',
            '@media screen and (max-width:700px)': {
              mt: -0.4,
            },
          }}
          size={isWide ? 100 : 80}
        />
      </div>
    );
  }
  console.log(time_lines);
  return (
    <>
      {time_lines.map((diary, index) => (
        <TimeLineCard
          key={index}
          diaryId={diary.attributes.id}
          diaryUserName={diary.attributes.diary_user_name}
          diaryUserImage={diary.attributes.diary_user_image}
          eventName={diary.attributes.event_name}
          eventDate={diary.attributes.event_date}
          eventVenue={diary.attributes.event_venue}
          DiaryMemberNickname={diary.attributes.diary_member_nickname}
          diaryImage={diary.attributes.diary_image}
          eventPolaroidCount={diary.attributes.event_polaroid_count}
          ImpressiveMemory={diary.attributes.impressive_memory}
          showUrl={`/diaries/show/${diary.attributes.id}}`}
        />
      ))}
      <InfiniteScroll
        loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
        hasMore={hasMore} //読み込みを行うかどうかの判定
        loader={loader}
        initialLoad={false}
        pageStart={1}
      >
        {diaries.map((diary, index) => (
          <TimeLineCard
            key={index}
            diaryId={diary.attributes.id}
            diaryUserName={diary.attributes.diary_user_name}
            diaryUserImage={diary.attributes.diary_user_image}
            eventName={diary.attributes.event_name}
            eventDate={diary.attributes.event_date}
            eventVenue={diary.attributes.event_venue}
            DiaryMemberNickname={diary.attributes.diary_member_nickname}
            diaryImage={diary.attributes.diary_image}
            eventPolaroidCount={diary.attributes.event_polaroid_count}
            ImpressiveMemory={diary.attributes.impressive_memory}
            showUrl={`/diaries/show/${diary.attributes.id}}`}
          />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default TimeLineList;
