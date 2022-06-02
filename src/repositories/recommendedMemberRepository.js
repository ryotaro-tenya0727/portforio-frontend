import axios from 'axios';
import {
  recommendedMembersCreateUrl,
  recommendedMembersIndexUrl,
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
};
