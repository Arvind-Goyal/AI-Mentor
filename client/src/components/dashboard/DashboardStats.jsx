import {
  FileText,
  MessageSquare,
  Flame,
} from "lucide-react";

import StatsCard from "./StatsCard";


const DashboardStats = () => {

  const stats = [
    {
      title: "Problems Analyzed",
      value: 42,
      change: "+16%",
      description: "vs last 7 days",
      icon: FileText,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },

    {
      title: "AI Sessions",
      value: 38,
      change: "+12%",
      description: "vs last 7 days",
      icon: MessageSquare,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Current Streak",
      value: "7 days",
      description: "Keep it up! 🔥",
      icon: Flame,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];


  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

      {
        stats.map((item)=>(
          <StatsCard
            key={item.title}
            {...item}
          />
        ))
      }

    </div>
  );
};


export default DashboardStats;