import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';
import CircularProgress from '@mui/material/CircularProgress';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import InfiniteScroll from 'react-infinite-scroller';

import useMedia from 'use-media';

import { Button, Circular } from './../atoms/atoms';
import { TimeLineCard } from './../organisms/Organisms';
import { API_URL } from '../../urls/index';

import button from './../../css/atoms/button.module.scss';

const TimeLineList = ({ isAuthenticated }) => {
  const [diaries, setDiaries] = useState([]);
  const { accessToken, setAccessToken } = useContext(AuthGuardContext);
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  let [loadType, setLoadType] = useState('all');
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
      setDiaries(response.data.data);
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
    }
  );

  const loadMore = async (page) => {
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
  };

  const followUser = async () => {
    setHasMore(true);
    setLoadType('follow');
    setIsLoading(true);
    const token = isAuthenticated ? await getAccessTokenSilently() : null;
    setAccessToken(token);
    const response = await axios
      .get(`${API_URL}/api/v1/user/timeline/follow?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    setDiaries([...response.data.data]);
    setIsLoading(false);
  };

  const followLoadMore = async (page) => {
    await axios
      .get(`${API_URL}/api/v1/user/timeline/follow?page=${page}`, {
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

  const allUser = async () => {
    setHasMore(true);
    setLoadType('all');
    setIsLoading(true);
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
    setDiaries(response.data.data);
    setIsLoading(false);
  };
  const loader = (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <Circular large={60} small={30} />
    </div>
  );
  if (queryLoading || isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '150px' }}>
        <Circular large={60} small={60} />
      </div>
    );
  }
  if (diaries.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '13px' }}>
          {' '}
          フォローしたユーザーまたはあなたの日記の投稿がありません
        </p>
        <p>
          {' '}
          <Link to='/users'>
            <Button className={button.recommended_and_diary_button}>
              <SupervisedUserCircleIcon
                sx={{
                  color: '#ff66d1',
                  fontSize: '16px',
                  mr: 0.4,
                  mb: -0.5,
                  '@media screen and (min-width:700px)': {
                    fontSize: '22px',
                    mb: -0.8,
                    mr: 1,
                  },
                }}
              />
              ユーザ一覧へ
            </Button>
          </Link>
        </p>
        <p>
          <Link to='/mypage'>
            <Button className={button.recommended_and_diary_button}>
              マイページへ
            </Button>
          </Link>
        </p>
      </div>
    );
  }

  if (loadType === 'all') {
    return (
      <div>
        {isAuthenticated ? (
          <button
            className={button.recommended_and_diary_button}
            onClick={followUser}
            style={{
              padding: '3px 6px 3px 6px',
              marginTop: '0px',
              marginBottom: '5px',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
            }}
          >
            フォローしたユーザーの日記
          </button>
        ) : (
          <></>
        )}
        <div style={{ marginTop: '25px' }}>
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
                diaryImageUrl={diary.attributes.diary_image}
                eventPolaroidCount={diary.attributes.event_polaroid_count}
                ImpressiveMemory={diary.attributes.impressive_memory}
                showUrl={`/diaries/show/${diary.attributes.id}}`}
                liked={diary.attributes.liked}
                me={diary.attributes.me}
                videoThumbnailUrl={diary.attributes.diary_video_thumbnail_url}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
  if (loadType === 'follow') {
    return (
      <div>
        <button
          className={button.recommended_and_diary_button}
          onClick={allUser}
          style={{
            padding: '3px 6px 3px 6px',
            marginTop: '0px',
            marginBottom: '5px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
          }}
        >
          全てのユーザーの日記を見る
        </button>
        <div style={{ marginTop: '25px' }}>
          <InfiniteScroll
            loadMore={followLoadMore} //項目を読み込む際に処理するコールバック関数
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
                liked={diary.attributes.liked}
                me={diary.attributes.me}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
};

export default TimeLineList;
