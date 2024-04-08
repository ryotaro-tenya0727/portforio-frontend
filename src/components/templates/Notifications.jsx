import { useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../urls/index';

import { Circular } from './../atoms/atoms';
import { NotificationCard } from './../organisms/Organisms';
import { useAuth0 } from '@auth0/auth0-react';

const Notifications = ({ changeNotificationCount, notificationCount }) => {
  const { getAccessTokenSilently } = useAuth0();
  let {
    isLoading,
    data: notifications,
    refetch,
  } = useQuery(
    ['notifications'],
    async () => {
      const accessToken = await getAccessTokenSilently();
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
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (notificationCount > 0) {
      (async () => {
        await refetch();
      })();
    }
  }, [notificationCount]);

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
            diaryId={notification.attributes.diary_id}
            diaryEventName={notification.attributes.diary_event_name}
            recommendedMemberId={notification.attributes.recommended_member_id}
            recommendedMemberUuid={
              notification.attributes.recommended_member_uuid
            }
            recommendedMemberName={
              notification.attributes.recommended_member_name
            }
            recommendedMemberGroup={
              notification.attributes.recommended_member_group
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
