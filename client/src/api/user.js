import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const searchUsers = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: query },
    withCredentials: true,
  });

  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await axios.get(`${API_URL}/${username}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getUserFollowers = async (username) => {
  const response = await axios.get(
    `${API_URL}/${username}/followers`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getUserFollowing = async (username) => {
  const response = await axios.get(
    `${API_URL}/${username}/following`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getUserAchievements = async (username) => {
  const response = await axios.get(
    `${API_URL}/${username}/achievements`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};