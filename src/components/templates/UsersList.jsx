import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthGuardContext } from './../../providers/AuthGuard';

import { UserCard } from './../organisms/Organisms';
import { API_URL } from '../../urls/index';

const UsersList = ({ isAuthenticated }) => {
  const { setAccessToken } = useContext(AuthGuardContext);
  const { getAccessTokenSilently } = useAuth0();
  const { isLoading, data: all_users } = useQuery(
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
      return response.data;
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
    }
  );
  if (isLoading) {
    return <div>ユーザーローディング</div>;
  }
  return (
    <div>
      {all_users.data.map((user, index) => (
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
