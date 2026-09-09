import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json({
        success: true,
        users: [],
      });
    }

    const search = q.trim();

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          username: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
      .select("name username profilePicture")
      .limit(5);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Search users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search users",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select(
        "name username profilePicture banner bio location socialLinks followers following createdAt"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isOwnProfile =
      user._id.toString() === req.user._id.toString();

    const isFollowing = user.followers?.some(
      (id) => id.toString() === req.user._id.toString()
    );

    return res.status(200).json({
      success: true,
      user,
      isOwnProfile,
      isFollowing,
    });
  } catch (error) {
    console.error("Get user profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .populate(
        "followers",
        "name username profilePicture"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      followers: user.followers || [],
    });
  } catch (error) {
    console.error("Get user followers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch followers",
    });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .populate(
        "following",
        "name username profilePicture"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      following: user.following || [],
    });
  } catch (error) {
    console.error("Get user following error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch following",
    });
  }
};