import User from "../models/User.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import History from "../models/History.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      username,
      bio,
      location,
      socialLinks,
      banner,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (location !== undefined) {
      user.location = location;
    }

    if (banner !== undefined) {
      user.banner = banner;
    }

    if (socialLinks !== undefined) {
      user.socialLinks = {
        ...user.socialLinks,
        ...socialLinks,
      };
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "ai-leetcode-mentor/profile/avatars"
    );

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profilePicture = result.secure_url;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Avatar upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload profile picture",
    });
  }
};

export const uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "ai-leetcode-mentor/profile/banners"
    );

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.banner = result.secure_url;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Banner upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload banner",
    });
  }
};

export const getAchievements = async (req, res) => {
  try {
    const history = await History.find({
      userId: req.user._id,
    }).sort({ createdAt: 1 });

    // Count unique problems
    const uniqueProblems = new Set(
      history.map((item) => item.title.trim().toLowerCase())
    );

    const problemCount = uniqueProblems.size;

    // Get unique activity dates
    const activityDates = [
      ...new Set(
        history.map((item) => {
          const date = new Date(item.createdAt);

          return date.toISOString().split("T")[0];
        })
      ),
    ].sort();

    // Calculate current and longest streak
    let longestStreak = 0;
    let currentStreak = 0;

    if (activityDates.length > 0) {
      let streak = 1;
      longestStreak = 1;

      for (let i = 1; i < activityDates.length; i++) {
        const previous = new Date(activityDates[i - 1]);
        const current = new Date(activityDates[i]);

        const difference =
          (current - previous) / (1000 * 60 * 60 * 24);

        if (difference === 1) {
          streak++;
        } else {
          streak = 1;
        }

        longestStreak = Math.max(longestStreak, streak);
      }

      // Calculate current streak
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const latestActivity = new Date(
        activityDates[activityDates.length - 1]
      );
      latestActivity.setUTCHours(0, 0, 0, 0);

      const daysSinceLatest =
        (today - latestActivity) /
        (1000 * 60 * 60 * 24);

      if (daysSinceLatest <= 1) {
        currentStreak = 1;

        for (let i = activityDates.length - 1; i > 0; i--) {
          const current = new Date(activityDates[i]);
          const previous = new Date(activityDates[i - 1]);

          const difference =
            (current - previous) /
            (1000 * 60 * 60 * 24);

          if (difference === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    // Normal achievements
    const achievements = [
      {
        id: "first-solve",
        title: "First Solve",
        description: "Complete your first problem",
        date: problemCount >= 1 ? activityDates[0] : null,
      },

      {
        id: "ten-problems",
        title: "10 Problems",
        description: "Complete 10 problems",
        date: problemCount >= 10 ? new Date().toISOString() : null,
      },

      {
        id: "fifty-problems",
        title: "50 Problems",
        description: "Complete 50 problems",
        date: problemCount >= 50 ? new Date().toISOString() : null,
      },

      {
        id: "hundred-problems",
        title: "100 Problems",
        description: "Complete 100 problems",
        date: problemCount >= 100 ? new Date().toISOString() : null,
      },

      {
        id: "streak",
        title:
          currentStreak >= 365
            ? "365 Day Streak"
            : currentStreak >= 200
            ? "200 Day Streak"
            : currentStreak >= 100
            ? "100 Day Streak"
            : currentStreak >= 30
            ? "Monthly Streak"
            : "Monthly Streak",

        description:
          currentStreak >= 30
            ? `${currentStreak} day solving streak`
            : "Maintain a 30 day solving streak",

        unlocked: currentStreak >= 30,
        currentStreak,
      },

      {
        id: "longest-streak",
        title: "Longest Streak",
        description: `${longestStreak} day personal record`,
        unlocked: longestStreak > 0,
        longestStreak,
      },
    ];

    return res.status(200).json({
      success: true,
      problemCount,
      currentStreak,
      longestStreak,
      achievements,
    });
  } catch (error) {
    console.error("Get achievements error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate achievements",
    });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate(
        "followers",
        "name username profilePicture"
      )
      .select("followers following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const followers = (user.followers || []).map((follower) => ({
      id: follower._id,
      name: follower.name,
      username: follower.username,
      avatar: follower.profilePicture,
      isFollowing: user.following.some(
        (id) => id.toString() === follower._id.toString()
      ),
    }));

    return res.status(200).json({
      success: true,
      followers,
    });
  } catch (error) {
    console.error("Get followers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch followers",
    });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
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

    const following = user.following.map((followedUser) => ({
      id: followedUser._id,
      name: followedUser.name,
      username: followedUser.username,
      avatar: followedUser.profilePicture,
    }));

    return res.status(200).json({
      success: true,
      following,
    });
  } catch (error) {
    console.error("Get following error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch following",
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const currentUser = await User.findById(currentUserId);

    if (currentUser.following.includes(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    console.error("Follow user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to follow user",
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const currentUser = await User.findById(currentUserId);

    if (!currentUser.following.includes(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId
    );

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId.toString()
    );

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.error("Unfollow user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to unfollow user",
    });
  }
};