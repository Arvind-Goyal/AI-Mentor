import {
  FileText,
  BookOpen,
  Flame,
} from "lucide-react";

import StatsCard from "./StatsCard";


const DashboardStats = ({ data }) => {

  const stats = [
    {
      title: "Problems Analyzed",
      value: data?.problemsAnalyzed ?? 0,
      description: "All time",
      icon: FileText,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },

    {
      title: "Topics Explored",
      value: data?.topicsExplored ?? 0,
      description: "Unique concepts",
      icon: BookOpen,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Current Streak",
      value: `${data?.currentStreak ?? 0} days`,
      description: "Keep it up! 🔥",
      icon: Flame,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];


  return (

    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

      {stats.map((item) => (

        <StatsCard
          key={item.title}
          {...item}
        />

      ))}

    </div>

  );
};


export default DashboardStats;