import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { API_URL } from '../urls/index';

export default function usePusherChannel(authUser, getAccessTokenSilently) {
  const [isLoading, setIsLoading] = useState(true);
  let pusher;
  let channel;
  let channelName;
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      channelAuthorization: {
        endpoint: `${API_URL}/api/v1/user/pusher_auth`,
      },
    });

    (async () => {
      const accessToken = await getAccessTokenSilently();
      await axios
        .post(
          `${API_URL}/api/v1/user/users/user_info`,
          { name: authUser.name, image: authUser.picture },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          channelName = `private-notification-user-${response.data.user_id}-channel`;
          setNotificationCount(response.data.new_notifications_count);
          channel = pusher.subscribe(channelName);
          channel.bind('new-notification-event', function (data) {
            setNotificationCount(data.new_notifications_count);
          });
          setIsLoading(false);
        });
    })();
    return () => {
      // Pusherの接続を切断する
      pusher.disconnect();
    };
  }, []);

  return { isLoading, notificationCount, setNotificationCount };
}
