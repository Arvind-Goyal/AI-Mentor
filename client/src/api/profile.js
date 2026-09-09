export const getProfile = async () => {
  const response = await fetch(
    "http://localhost:5000/api/profile",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};

export const updateProfile = async (profileData) => {
  const response = await fetch(
    "http://localhost:5000/api/profile",
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await fetch(
    "http://localhost:5000/api/profile/avatar",
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload profile picture"
    );
  }

  return data;
};

export const uploadBanner = async (file) => {
  const formData = new FormData();

  formData.append("banner", file);

  const response = await fetch(
    "http://localhost:5000/api/profile/banner",
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload banner"
    );
  }

  return data;
};

export const getAchievements = async () => {
  const response = await fetch(
    "http://localhost:5000/api/profile/achievements",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch achievements"
    );
  }

  return data;
};

export const getFollowers = async () => {
  const response = await fetch(
    "http://localhost:5000/api/profile/followers",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch followers"
    );
  }

  return data;
};

export const getFollowing = async () => {
  const response = await fetch(
    "http://localhost:5000/api/profile/following",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch following"
    );
  }

  return data;
};

export const followUser = async (userId) => {
  const response = await fetch(
    `http://localhost:5000/api/profile/follow/${userId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to follow user"
    );
  }

  return data;
};

export const unfollowUser = async (userId) => {
  const response = await fetch(
    `http://localhost:5000/api/profile/follow/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to unfollow user"
    );
  }

  return data;
};