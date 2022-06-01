const REST_API_URL = `${process.env.REACT_APP_REST_URL}/api/v1`;

export const registerUserUrl = `${REST_API_URL}/users`;
export const getUserUrl = `${REST_API_URL}/users`;
export const recommendedMembersIndexUrl = `${REST_API_URL}/user/recommended_members`;
export const recommendedMembersCreateUrl = `${REST_API_URL}/user/recommended_members`;
export const recommendedMembersPatchUrl = `${REST_API_URL}/user/recommended_members/:id`;
export const recommendedMembersDeleteUrl = `${REST_API_URL}/user/recommended_members/:id`;
