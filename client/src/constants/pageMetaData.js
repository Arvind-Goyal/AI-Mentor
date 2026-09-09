import {
  Code2,
  History,
  LayoutDashboard,
  Sparkles,
  UserRound,
} from "lucide-react";

const PAGE_METADATA = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Track your coding journey",
    icon: LayoutDashboard,
  },

  "/analyze": {
    title: "Analyze Problem",
    subtitle: "Get AI-powered analysis and learn step by step",
    icon: Sparkles,
  },

  "/editor": {
    title: "Code Editor",
    subtitle: "Write, test and improve your solution",
    icon: Code2,
  },

  "/history": {
    title: "History",
    subtitle: "Review your previous attempts",
    icon: History,
  },

  "/profile": {
    title: "Profile",
    subtitle: "Manage your account",
    icon: UserRound,
  },
};

export default PAGE_METADATA;