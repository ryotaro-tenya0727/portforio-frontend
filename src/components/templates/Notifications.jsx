//newNotificationCount =0
// キャッシュを0にする
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useContext, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../urls/index';

import { Circular } from './../atoms/atoms';
const Notifications = () => {
  const { accessToken } = useContext(AuthGuardContext);
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: notifications,
    isSuccess,
  } = useQuery(
    ['notifications'],
    async () => {
      const response = await axios
        .get(`${API_URL}/api/v1/user/notifications`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      // onSuccess: async () => {
      //   const previousData = await queryClient.getQueryData('users');
      //   queryClient.setQueryData('users', () => {
      //     return { ...previousData, new_notifications_count: 0 };
      //   });
      // },
    }
  );

  if (isLoading) {
    return <Circular large={80} small={60} top={120} />;
  }
  if (notifications.length === 0) {
    return (
      <>
        <p style={{ fontSize: '17px' }}> 現在通知はありません </p>
      </>
    );
  }

  console.log(notifications);
};

export default Notifications;
