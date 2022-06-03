import axios from 'axios';
import {
  recommendedMembersCreateUrl,
  recommendedMembersIndexUrl,
  REST_API_URL,
} from '../urls';

export const recommendedMemberRepository = {
  getRecommendedMember: async (token) => {
    const response = await axios
      .get(recommendedMembersIndexUrl, {
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
};
