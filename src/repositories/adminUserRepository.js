import axios from 'axios';

import { API_URL } from '../urls/index';

export const adminUserRepository = {
  getAdminUser: async (token) => {
    const response = await axios
      .get(`${API_URL}/admin/users`, {
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

  deleteAdminUser: async (token, userId) => {
    await axios
      .delete(`${API_URL}/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    return;
  },
};
