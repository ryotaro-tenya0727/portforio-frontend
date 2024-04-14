import axios from 'axios';
import { REST_API_URL } from '../../../../urls/index';

export const videoConvertStreamingRepository = {
  createStreamingVideo: async (params, token) => {
    const response = await axios
      .post(
        `${REST_API_URL}/user/external/cloudflare/stream/video_uploads`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error) => {
        console.error(error.response.data);
      });
    return response.data;
  },
};
