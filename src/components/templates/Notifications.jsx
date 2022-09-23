//newNotificationCount =0
// キャッシュを0にする
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useContext } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../urls/index';

import { Circular } from './../atoms/atoms';
import { NotificationCard } from './../organisms/Organisms';
const Notifications = ({ changeNotificationCount }) => {
  const { accessToken } = useContext(AuthGuardContext);
  const { isLoading, data: notifications } = useQuery(
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
      changeNotificationCount(0);
      return response.data.data;
    },
    {
      cacheTime: 0,
      staleTime: 3000000,
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
  return (
    <>
      {notifications.map((notification, index) => {
        return (
          <NotificationCard
            key={index}
            notifierName={notification.attributes.notifier_name}
            notifierImage={notification.attributes.notifier_image}
            diaryEventName={notification.attributes.diary_event_name}
            recommendedMemberName={
              notification.attributes.recommended_member_name
            }
            action={notification.attributes.action}
            checked={notification.attributes.checked}
            created_at={notification.attributes.created_at}
          />
        );
      })}
    </>
  );
};

export default Notifications;
