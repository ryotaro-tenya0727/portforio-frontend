import axios from 'axios';

import { REST_API_URL } from '../urls/index';

export const recommendedMemberDiaryRepository = {
  getRecommendedMemberDiary: async (recommendedMemberId, token) => {
    const response = await axios
      .get(
        `${REST_API_URL}/user/recommended_members/${recommendedMemberId}/diaries`,
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

  createRecommendedMemberDiary: async (
    params,
    recommended_member_id,
    token
  ) => {
    await axios
      .post(
        `${REST_API_URL}/user/recommended_members/${recommended_member_id}/diaries`,
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
  },

  putRecommendedMemberDiary: async (params, diaryId, token) => {
    await axios
      .put(`${REST_API_URL}/user/diaries/${diaryId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  },

  deleteRecommendedMemberDiary: async (diaryId, token) => {
    await axios
      .delete(`${REST_API_URL}/user/diaries/${diaryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  },
  getRecommendedMemberDiaryShow: async (diaryId, token) => {
    const response = await axios
      .get(`${REST_API_URL}/user/diaries/${diaryId}`, {
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
};
