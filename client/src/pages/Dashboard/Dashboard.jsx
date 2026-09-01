import { useEffect, useState } from "react";

import DashboardStats from "../../components/dashboard/DashboardStats";
import TopicExploration from "../../components/dashboard/TopicExploration";
import LanguageUsage from "../../components/dashboard/LanguageUsage";
import MentorInsight from "../../components/dashboard/MentorInsight";
import WeeklyActivity from "../../components/dashboard/WeeklyActivity";

import DashboardLayout from "../DashboardLayout/Dashboard";

import { getDashboard } from "../../api/dashboard";


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllTopics, setShowAllTopics] = useState(false);


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const data = await getDashboard();

        console.log("Dashboard data:", data);

        setDashboardData(data);

      } catch (error) {

        console.error(
          "Failed to fetch dashboard:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  if (loading) {

    return (
      <DashboardLayout>

        <div className="flex min-h-[60vh] items-center justify-center bg-[#F8FAFC]">

          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>

        </div>

      </DashboardLayout>
    );

  }

    return (
  <DashboardLayout>

    <div className="min-h-full bg-[#F8FAFC] px-8 py-7">

      <div className="w-full">

        {/* Stats */}

        <DashboardStats
          data={dashboardData?.stats}
        />


        {/* Topic + Language */}

<div
  className={`mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-2`}
>

  {/* Topic Exploration */}

  <TopicExploration
    data={dashboardData?.topics}
    showAll={showAllTopics}
    setShowAll={setShowAllTopics}
  />


  {/* Right side */}

  <div className="flex flex-col gap-6">

    <LanguageUsage
      data={dashboardData?.languages}
    />

    {/* Mentor moves here only when expanded */}

    {showAllTopics && (
      <MentorInsight
        data={dashboardData?.mentorInsight}
      />
    )}

  </div>

</div>


{/* Mentor stays below both cards when collapsed */}

{!showAllTopics && (
  <div className="mt-6">

    <MentorInsight
      data={dashboardData?.mentorInsight}
    />

  </div>
)}


{/* Weekly Activity */}

<div className="mt-6">

  <WeeklyActivity
    data={dashboardData?.weeklyActivity}
  />

</div>

      </div>

    </div>

  </DashboardLayout>
);

};


export default Dashboard;