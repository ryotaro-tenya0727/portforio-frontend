import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';
import CircularProgress from '@mui/material/CircularProgress';

import useMedia from 'use-media';

import { TimeLineCard } from './../organisms/Organisms';
import { API_URL } from '../../urls/index';

const TimeLineList = ({ isAuthenticated }) => {
  const isWide = useMedia({ minWidth: '700px' });
  const [diaries, setDiaries] = useState([]);
  const { setAccessToken } = useContext(AuthGuardContext);
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  let { isLoading: queryLoading, data: all_diaries } = useQuery(
    ['all_users'],
    async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
      setAccessToken(token);
      const response = await axios
        .get(`${API_URL}/api/v1/user/timeline`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          console.error(error.response.data);
        });
      setDiaries(response.data);
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
    }
  );
  if (queryLoading || isLoading) {
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
  return (
    <>
      {diaries.data.map((diary, index) => (
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
    </>
  );
};

export default TimeLineList;
