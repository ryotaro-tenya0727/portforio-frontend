import axios from 'axios';
import { REST_API_URL } from '../urls/index';

export const recommendedMemberDiaryRepository = {
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
};
