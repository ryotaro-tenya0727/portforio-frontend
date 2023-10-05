import axios from 'axios';
import { REST_API_URL } from '../urls/index';
import { useAuth0 } from '@auth0/auth0-react';

export const s3PresignedUrlRepository = {
  getPresignedUrl: async (params, token) => {
    const response = await axios
      .post(`${REST_API_URL}/user/s3_presigned_url`, params, {
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
};
