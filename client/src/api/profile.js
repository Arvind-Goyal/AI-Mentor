import api from "../lib/axios";
import { fetchWithCache, invalidateCache } from "../lib/cache";

export const getProfile = async (force = false) => {
  return fetchWithCache(
    "user_own_profile",
    async () => {
      const response = await api.get("/profile");
      return response.data;
    },
    { ttl: 2 * 60 * 1000, force }
  );
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/profile", profileData);
    invalidateCache("user_own_profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
      { cause: error }
    );
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/profile/avatar", formData);
    invalidateCache("user_own_profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to upload profile picture",
      { cause: error }
    );
  }
};

export const uploadBanner = async (file) => {
  try {
    const formData = new FormData();
    formData.append("banner", file);

    const response = await api.post("/profile/banner", formData);
    invalidateCache("user_own_profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to upload banner",
      { cause: error }
    );
  }
};

export const getAchievements = async (force = false) => {
  return fetchWithCache(
    "user_achievements",
    async () => {
      const response = await api.get("/profile/achievements");
      return response.data;
    },
    { ttl: 2 * 60 * 1000, force }
  );
};

export const getFollowers = async (force = false) => {
  return fetchWithCache(
    "user_followers",
    async () => {
      const response = await api.get("/profile/followers");
      return response.data;
    },
    { ttl: 2 * 60 * 1000, force }
  );
};

export const getFollowing = async (force = false) => {
  return fetchWithCache(
    "user_following",
    async () => {
      const response = await api.get("/profile/following");
      return response.data;
    },
    { ttl: 2 * 60 * 1000, force }
  );
};

export const followUser = async (userId) => {
  try {
    const response = await api.post(`/profile/follow/${userId}`);
    invalidateCache("user_following");
    invalidateCache("user_followers");
    invalidateCache("user_own_profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to follow user",
      { cause: error }
    );
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await api.delete(`/profile/follow/${userId}`);
    invalidateCache("user_following");
    invalidateCache("user_followers");
    invalidateCache("user_own_profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to unfollow user",
      { cause: error }
    );
  }
};