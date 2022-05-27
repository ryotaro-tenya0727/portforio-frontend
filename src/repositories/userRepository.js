import axios from 'axios';

import { registerUserUrl } from '../urls';

export const userRepository = {
  createUser: async (params, token) => {
    const response = await axios.post(
      registerUserUrl,
      {
        user: {
          name: params.name,
          user_image: params.user_image,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
};
