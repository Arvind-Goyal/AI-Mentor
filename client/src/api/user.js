import api from "../lib/axios"; // adjust path if needed

export const searchUsers = async (query) => {
  const response = await api.get("/users/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await api.get(`/users/${username}`);

  return response.data;
};

export const getUserFollowers = async (username) => {
  const response = await api.get(
    `/users/${username}/followers`
  );

  return response.data;
};

export const getUserFollowing = async (username) => {
  const response = await api.get(
    `/users/${username}/following`
  );

  return response.data;
};

export const getUserAchievements = async (username) => {
  const response = await api.get(
    `/users/${username}/achievements`
  );

  return response.data;
};