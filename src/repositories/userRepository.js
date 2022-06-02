import axios from 'axios';

import { registerUserUrl, getUserUrl } from '../urls';

export const userRepository = {
  createUser: async (params, token) => {
    const response = await axios.post(registerUserUrl, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  getUser: async (token) => {
    const response = await axios.get(getUserUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
};
