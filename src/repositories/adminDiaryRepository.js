import axios from 'axios';

import { API_URL } from '../urls/index';

export const adminDiaryRepository = {
  getAdminDiary: async (token, userId) => {
    const response = await axios
      .get(`${API_URL}/admin/users/${userId}/diaries`, {
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

  deleteAdmindiary: async (token, diaryId) => {
    await axios
      .delete(`${API_URL}/admin/diaries/${diaryId}`, {
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
