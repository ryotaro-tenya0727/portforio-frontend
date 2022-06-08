import axios from 'axios';

export const s3PresignedUrlRepository = {
  getPresignedUrl: async (params, token) => {
    const response = await axios
      .post(`${process.env.REACT_APP_REST_URL}/user/s3_presigned_url`, params, {
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
