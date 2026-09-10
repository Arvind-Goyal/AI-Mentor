import api from "../lib/axios"; // adjust path if your api.js is elsewhere

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch profile"
    );
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/profile", profileData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/profile/avatar", formData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to upload profile picture"
    );
  }
};

export const uploadBanner = async (file) => {
  try {
    const formData = new FormData();
    formData.append("banner", file);

    const response = await api.post("/profile/banner", formData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to upload banner"
    );
  }
};

export const getAchievements = async () => {
  try {
    const response = await api.get("/profile/achievements");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch achievements"
    );
  }
};

export const getFollowers = async () => {
  try {
    const response = await api.get("/profile/followers");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch followers"
    );
  }
};

export const getFollowing = async () => {
  try {
    const response = await api.get("/profile/following");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch following"
    );
  }
};

export const followUser = async (userId) => {
  try {
    const response = await api.post(`/profile/follow/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to follow user"
    );
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await api.delete(`/profile/follow/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to unfollow user"
    );
  }
};