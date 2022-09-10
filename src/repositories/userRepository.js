import axios from 'axios';

import { registerUserUrl, getUserUrl } from '../urls';

export const userRepository = {
  createUser: async (params, token) => {
    const response = await axios
      .post(registerUserUrl, params, {
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

  getUser: async (token) => {
    const response = await axios
      .get(`${getUserUrl}/user/user_info`, {
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

  deleteUser: async (token) => {
    await axios
      .delete(`${getUserUrl}/destroy`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  },
};
