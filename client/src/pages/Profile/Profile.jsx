import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileTabs from "../../components/profile/ProfileTabs";
import Achievements from "../../components/profile/Achievements";
import FollowersList from "../../components/profile/FollowersList";
import FollowingList from "../../components/profile/FollowingList";

import {
  getProfile,
  getAchievements,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../../api/profile";

import {
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
  getUserAchievements,
} from "../../api/user";

import DashboardLayout from "../DashboardLayout/Dashboard";

const Profile = () => {
  const { username } = useParams();

  const isPublicProfile = Boolean(username);

  const [activeTab, setActiveTab] = useState("achievements");

  const [achievementData, setAchievementData] = useState(null);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [profile, setProfile] = useState(null);

  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= Follow ================= */

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);

      if (isPublicProfile) {
        setIsFollowing(true);
        return;
      }

      const [followingData, followersData] = await Promise.all([
        getFollowing(),
        getFollowers(),
      ]);

      setFollowing(followingData.following);
      setFollowers(followersData.followers);
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  /* ================= Unfollow ================= */

  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);

      if (isPublicProfile) {
        setIsFollowing(false);
        return;
      }

      const [followingData, followersData] = await Promise.all([
        getFollowing(),
        getFollowers(),
      ]);

      setFollowing(followingData.following);
      setFollowers(followersData.followers);
    } catch (error) {
      console.error("Unfollow error:", error);
    }
  };

  /* ================= Load Profile ================= */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * ==========================================
         * PUBLIC PROFILE
         * /users/:username
         * ==========================================
         */

        if (isPublicProfile) {
          const profileData = await getUserProfile(username);

          const [
                followersData,
                followingData,
                achievementsData,
              ] = await Promise.all([
                getUserFollowers(username),
                getUserFollowing(username),
                getUserAchievements(username),
              ]);

          setProfile(profileData.user);

          setIsOwnProfile(profileData.isOwnProfile);
          setIsFollowing(profileData.isFollowing);

          setFollowers(followersData.followers || []);
          setFollowing(followingData.following || []);
          
          setAchievementData(achievementsData);
          return;
        }

        /*
         * ==========================================
         * OWN PROFILE
         * /profile
         * ==========================================
         */

        const [
          profileData,
          achievementsData,
          followersData,
          followingData,
        ] = await Promise.all([
          getProfile(),
          getAchievements(),
          getFollowers(),
          getFollowing(),
        ]);

        setProfile(profileData.user);

        setAchievementData(achievementsData);

        setFollowers(followersData.followers || []);
        setFollowing(followingData.following || []);

        setIsOwnProfile(true);
        setIsFollowing(false);
      } catch (error) {
        console.error("Profile fetch error:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username, isPublicProfile]);

  /* ================= Loading ================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  /* ================= Error ================= */

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">
          {error || "Failed to load profile"}
        </p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <main className="mx-auto w-full max-w-[1400px] px-6 py-6">

          <ProfileHeader
            user={profile}
            onProfileUpdate={setProfile}
            isOwnProfile={isOwnProfile}
            isFollowing={isFollowing}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
          />

          <ProfileTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            followersCount={followers.length}
            followingCount={following.length}
          />

          <div className="mt-8">

            {/* ================= Achievements ================= */}

            {activeTab === "achievements" && (
              <Achievements
                achievements={achievementData?.achievements || []}
                currentStreak={
                  achievementData?.currentStreak || 0
                }
                longestStreak={
                  achievementData?.longestStreak || 0
                }
              />
            )}

            {/* ================= Followers ================= */}

            {activeTab === "followers" && (
              <FollowersList
                followers={followers}
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
                readOnly={!isOwnProfile}
              />
            )}

            {/* ================= Following ================= */}

            {activeTab === "following" && (
              <FollowingList
                following={following}
                onUnfollow={handleUnfollow}
                readOnly={!isOwnProfile}
              />
            )}

          </div>

        </main>
      </div>
    </DashboardLayout>
  );
};

export default Profile;