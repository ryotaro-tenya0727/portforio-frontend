import axios from 'axios';

import { REST_API_URL } from '../urls';

const profileUpdateUrl = `${REST_API_URL}/user/profile`;
const profileGetUrl = `${REST_API_URL}/user/profile`;

export const profileRepository = {
  getProfile: async (token) => {
    const response = await axios
      .get(profileGetUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error);
      });
    return response.data;
  },
  putProfile: async (params, token) => {
    await axios
      .put(profileUpdateUrl, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
