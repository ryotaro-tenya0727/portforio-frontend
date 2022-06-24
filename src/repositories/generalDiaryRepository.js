import axios from 'axios';
import { REST_API_URL } from '../urls/index';

export const generalDiaryRepository = {
  getGeneralDiary: async () => {
    const response = await axios
      .get(`${REST_API_URL}/diaries`)
      .catch((error) => {
        console.error(error.response.data);
      });
    return response.data;
  },
};
