import axios from 'axios';

import {
  recommendedMembersCreateUrl,
  recommendedMembersIndexUrl,
  REST_API_URL,
} from '../urls';

export const recommendedMemberRepository = {
  getRecommendedMember: async (token, page, searchWord = null) => {
    const startPage = page || 1;
    const response = await axios
      .get(
        `${recommendedMembersIndexUrl}?page=${startPage}&search_word=${searchWord}`,
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
  createRecommendedMember: async (params, token) => {
    await axios
      .post(recommendedMembersCreateUrl, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  },
  putRecommendedMember: async (params, recommendedMemberId, token) => {
    await axios
      .put(
        `${REST_API_URL}/user/recommended_members/${recommendedMemberId}`,
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
  deleteRecommendedMember: async (recommendedMemberId, token) => {
    await axios
      .delete(
        `${REST_API_URL}/user/recommended_members/${recommendedMemberId}`,
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

  showRecommendedMember: async (recommendedMemberId, token) => {
    const response = await axios
      .get(`${REST_API_URL}/user/recommended_members/${recommendedMemberId}`, {
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
