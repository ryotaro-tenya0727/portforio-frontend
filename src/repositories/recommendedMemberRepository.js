import axios from 'axios';
import {
  recommendedMembersCreateUrl,
  recommendedMembersIndexUrl,
} from '../urls';

export const recommendedMembersRepository = {
  createRecommendedMember: async (params, token) => {
    await axios.post(recommendedMembersCreateUrl, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },

  getRecommendedMembers: async (token) => {
    const response = await axios.get(recommendedMembersIndexUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
};
