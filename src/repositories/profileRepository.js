import axios from 'axios';

import { REST_API_URL } from '../urls';

const profileUpdateUrl = `${REST_API_URL}/user/profile`;

export const profileRepository = {
  putProfile: async (params, token) => {
    console.log('profileRepository');
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
