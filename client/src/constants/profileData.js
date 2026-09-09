import avatar1 from "../assets/profile/avatar/avatar1.png";
import avatar2 from "../assets/profile/avatar/avatar2.png";
import avatar3 from "../assets/profile/avatar/avatar3.png";
import avatar4 from "../assets/profile/avatar/avatar4.png";

export const profileData = {
  name: "Arvind Goyal",
  username: "@arvindgoyal",

  bio: "CS student | Problem solver | Building a better version of myself every day. 🚀",

  location: "India",
  joined: "Jan 2024",

  followers: 3,
  following: 3,

  currentStreak: 42,
  longestStreak: 42,

  avatar: avatar1,
  banner: "/profile-banner.jpg",

  socialLinks: {
    linkedin: "#",
    github: "#",
    leetcode: "#",
    portfolio: "#",
  },

  achievements: [
    {
      id: 1,
      icon: "🚩",
      title: "First Solve",
      description: "Solved your first problem",
      date: "Jan 12, 2024",
    },
    {
      id: 2,
      icon: "🔟",
      title: "10 Problems",
      description: "Solved 10 problems",
      date: "Jan 20, 2024",
    },
    {
      id: 3,
      icon: "🏅",
      title: "50 Problems",
      description: "Solved 50 problems",
      date: "Feb 15, 2024",
    },
    {
      id: 4,
      icon: "💯",
      title: "100 Problems",
      description: "Solved 100 problems",
      date: "Mar 10, 2024",
    },
  ],

  followersList: [
  {
    id: 1,
    name: "Rahul Sharma",
    username: "@rahulsharma",
    avatar: avatar2,
  },
  {
    id: 2,
    name: "Priya Singh",
    username: "@priyasingh",
    avatar: avatar3,
  },
  {
    id: 3,
    name: "Prince Narula",
    username: "@princenarula",
    avatar: avatar4,
  },
  
],

followingList: [
  {
    id: 1,
    name: "Rohan Mehta",
    username: "@rohanmehta",
    avatar: avatar3,
  },
  {
    id: 2,
    name: "Ananya Sharma",
    username: "@ananyasharma",
    avatar: avatar4,
  },
  {
    id: 3,
    name: "Karan Patel",
    username: "@karanpatel",
    avatar: avatar2,
  },
  
],
};