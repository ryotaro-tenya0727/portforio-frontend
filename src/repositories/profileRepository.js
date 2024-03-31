import axios from 'axios';

import { REST_API_URL } from '../urls';

const profileUpdateUrl = `${REST_API_URL}/api/v1/user/profile`;

export const profileRepository = {
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
