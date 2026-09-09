import { useEffect, useState } from "react";

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
import DashboardLayout from "../DashboardLayout/Dashboard";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("achievements");

  const [achievementData, setAchievementData] = useState(null);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);

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

  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);

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
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
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
        setFollowers(followersData.followers);
        setFollowing(followingData.following);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

      loadProfile();
    }, []);
  

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">
          {error || "Failed to load profile"}
        </p>
      </div>
    );
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <main className="mx-auto w-full max-w-[1400px] px-6 py-6">

        <ProfileHeader
          user={profile}
          onProfileUpdate={setProfile}
        />

        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          followersCount={followers.length}
          followingCount={following.length}
        />

        <div className="mt-8">

          {activeTab === "achievements" && (
            <Achievements
              achievements={achievementData?.achievements || []}
              currentStreak={achievementData?.currentStreak || 0}
              longestStreak={achievementData?.longestStreak || 0}
            />
          )}

          {activeTab === "followers" && (
            <FollowersList
              followers={followers}
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
            />
          )}

          {activeTab === "following" && (
            <FollowingList
              following={following}
              onUnfollow={handleUnfollow}
            />
          )}

        </div>

      </main>
      </div>
      </DashboardLayout>
  );
};

export default Profile;