import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import useMedia from 'use-media';

import { UserCard } from './../organisms/Organisms';
import { API_URL } from '../../urls/index';

import button from './../../css/atoms/button.module.css';
import list from './../../css/templates/list.module.css';

const UsersList = ({ isAuthenticated }) => {
  const isWide = useMedia({ minWidth: '700px' });
  const [users, setUsers] = useState([]);
  const { setAccessToken } = useContext(AuthGuardContext);
  const { getAccessTokenSilently } = useAuth0();
  const { register, handleSubmit } = useForm({});
  const [isLoading, setIsLoading] = useState(false);
  let { isLoading: queryLoading, data: all_users } = useQuery(
    ['all_users'],
    async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
      setAccessToken(token);
      const response = await axios
        .get(`${API_URL}/api/v1/user/user_relationships`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          console.error(error.response.data);
        });
      setUsers(response.data);
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
    }
  );
  const searchUser = async (data) => {
    setIsLoading(true);
    data.search.name = data.search.name.trim();
    if (!data.search.name) {
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
      const response = await axios
        .get(`${API_URL}/api/v1/user/user_relationships`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          console.error(error.response.data);
        });
      setUsers(response.data);
      setIsLoading(false);
      return;
    }

    const token = isAuthenticated ? await getAccessTokenSilently() : null;
    const response = await axios
      .post(`${API_URL}/api/v1/user/user_relationships/search`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    setUsers(response.data);
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
          size={isWide ? 100 : 80}
        />
      </div>
    );
  }
  return (
    <div>
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
            margin: '-1px 0px 0px 5px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
          }}
          className={button.recommended_and_diary_button}
        />
      </form>
      {users.data.map((user, index) => (
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
        />
      ))}
    </div>
  );
};

export default UsersList;
