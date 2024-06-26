import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import useMedia from 'use-media';
import InfiniteScroll from 'react-infinite-scroller';

import { UserCard } from './../organisms/Organisms';
import { API_URL } from '../../urls/index';

import button from './../../css/atoms/button.module.scss';
import list from './../../css/templates/list.module.css';

const UsersList = ({ isAuthenticated }) => {
  const isWide = useMedia({ minWidth: '700px' });
  const [users, setUsers] = useState([]);
  const { accessToken, setAccessToken } = useContext(AuthGuardContext);
  const { getAccessTokenSilently } = useAuth0();
  const { register, handleSubmit } = useForm({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  let [loadType, setLoadType] = useState('all');
  let [searchWord, setSearchWord] = useState({ search: { name: '' } });
  let { isLoading: queryLoading, data: all_users } = useQuery(
    ['all_users'],
    async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
      setAccessToken(token);
      const response = await axios
        .get(`${API_URL}/api/v1/user/user_relationships?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          console.error(error.response.data);
        });
      setUsers(response.data.data);
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
    }
  );
  const loadMore = async (page) => {
    await axios
      .get(`${API_URL}/api/v1/user/user_relationships?page=${page}`, {
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
        setUsers([...users, ...data]);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };
  const loader = (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <CircularProgress
        sx={{
          color: '#ff94df',
          mt: -1,
          fontSize: '80px',
          '@media screen and (max-width:700px)': {
            mt: -0.4,
          },
        }}
        size={isWide ? 60 : 30}
      />
    </div>
  );
  const searchUser = async (data) => {
    setHasMore(true);
    setLoadType('search');
    setIsLoading(true);
    setSearchWord(data);
    const token = isAuthenticated ? await getAccessTokenSilently() : null;
    setAccessToken(token);
    const response = await axios
      .post(`${API_URL}/api/v1/user/user_relationships/search?page=1`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    setUsers([...response.data.data]);
    setIsLoading(false);
  };

  const searchLoadMore = async (page) => {
    await axios
      .post(
        `${API_URL}/api/v1/user/user_relationships/search?page=${page}`,
        searchWord,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        const data = response.data.data;
        //データ件数が0件の場合、処理終了
        if (data.length < 1) {
          setHasMore(false);
          return;
        }
        setUsers([...users, ...data]);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const createTotalPoraloidRank = async () => {
    setIsLoading(true);
    setLoadType('ranking');
    const token = isAuthenticated ? await getAccessTokenSilently() : null;
    const response = await axios
      .get(`${API_URL}/api/v1/user/rankings/total_polaroid_count`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    setUsers([...response.data.data]);
    setIsLoading(false);
  };
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
          size={isWide ? 60 : 30}
        />
      </div>
    );
  }
  if (loadType === 'all') {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <form onSubmit={handleSubmit(searchUser)}>
            <input
              className={list.member_search_form}
              {...register('search.name')}
              placeHolder='ユーザー名で検索'
            />
            <input
              type='submit'
              value='検索'
              style={{
                padding: '3px 6px 3px 6px',
                margin: '0px 0px 0px 5px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
              }}
              className={button.recommended_and_diary_button}
            />
          </form>
          <p>
            <button
              className={button.recommended_and_diary_button}
              onClick={createTotalPoraloidRank}
              style={{
                padding: '3px 6px 3px 6px',
                margin: '0px 0px 0px 0px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
              }}
            >
              <PhotoCameraBackIcon
                sx={{
                  fontSize: '19px',
                  mb: '-3.5px',
                  mr: 0.5,
                  color: '#FF8C00',
                  '@media screen and (max-width:700px)': {
                    fontSize: '15px',
                  },
                }}
              />
              チェキ数ランキング
            </button>
          </p>
        </div>

        <InfiniteScroll
          loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
          hasMore={hasMore} //読み込みを行うかどうかの判定
          loader={loader}
          initialLoad={false}
          pageStart={1}
        >
          {users.map((user, index) => (
            <UserCard
              key={index}
              id={user.attributes.id}
              name={user.attributes.name}
              meIntroduction={user.attributes.me_introduction}
              userImage={user.attributes.user_image}
              recommendedMembersCount={
                user.attributes.recommended_members_count
              }
              diariesCount={user.attributes.diaries_count}
              totalPolaroidCount={user.attributes.total_polaroid_count}
              following={user.attributes.following}
              me={user.attributes.me}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
  if (loadType === 'search') {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <form onSubmit={handleSubmit(searchUser)}>
            <input
              className={list.member_search_form}
              {...register('search.name')}
              placeHolder='ユーザー名で検索'
            />
            <input
              type='submit'
              value='検索'
              style={{
                padding: '3px 6px 3px 6px',
                margin: '0px 0px 0px 5px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
              }}
              className={button.recommended_and_diary_button}
            />
          </form>
          <p>
            <button
              className={button.recommended_and_diary_button}
              onClick={createTotalPoraloidRank}
              style={{
                padding: '3px 6px 3px 6px',
                margin: '0px 0px 0px 0px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
              }}
            >
              <PhotoCameraBackIcon
                sx={{
                  fontSize: '19px',
                  mb: '-3.5px',
                  mr: 0.5,
                  color: '#FF8C00',
                  '@media screen and (max-width:700px)': {
                    fontSize: '15px',
                  },
                }}
              />
              チェキ数ランキング
            </button>
          </p>
        </div>
        <InfiniteScroll
          loadMore={searchLoadMore} //項目を読み込む際に処理するコールバック関数
          hasMore={hasMore} //読み込みを行うかどうかの判定
          loader={loader}
          initialLoad={false}
          pageStart={1}
        >
          {users.map((user, index) => (
            <UserCard
              key={index}
              id={user.attributes.id}
              name={user.attributes.name}
              meIntroduction={user.attributes.me_introduction}
              userImage={user.attributes.user_image}
              recommendedMembersCount={
                user.attributes.recommended_members_count
              }
              diariesCount={user.attributes.diaries_count}
              totalPolaroidCount={user.attributes.total_polaroid_count}
              following={user.attributes.following}
              me={user.attributes.me}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
  if (loadType === 'ranking') {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <form onSubmit={handleSubmit(searchUser)}>
            <input
              className={list.member_search_form}
              {...register('search.name')}
              placeHolder='ユーザー名で検索'
            />
            <input
              type='submit'
              value='検索'
              style={{
                padding: '3px 6px 3px 6px',
                margin: '0px 0px 0px 5px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
              }}
              className={button.recommended_and_diary_button}
            />
          </form>
          <p>
            <button
              className={button.recommended_and_diary_button}
              onClick={createTotalPoraloidRank}
              style={{
                padding: '3px 6px 3px 6px',
                margin: '0px 0px 0px 0px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
              }}
            >
              <PhotoCameraBackIcon
                sx={{
                  fontSize: '19px',
                  mb: '-3.5px',
                  mr: 0.5,
                  color: '#FF8C00',
                  '@media screen and (max-width:700px)': {
                    fontSize: '15px',
                  },
                }}
              />
              チェキ数ランキング
            </button>
          </p>
        </div>
        {users.map((user, index) => (
          <UserCard
            key={index}
            id={user.attributes.id}
            name={user.attributes.name}
            meIntroduction={user.attributes.me_introduction}
            userImage={user.attributes.user_image}
            recommendedMembersCount={user.attributes.recommended_members_count}
            diariesCount={user.attributes.diaries_count}
            totalPolaroidCount={user.attributes.total_polaroid_count}
            following={user.attributes.following}
            me={user.attributes.me}
          />
        ))}
      </div>
    );
  }
};

export default UsersList;
