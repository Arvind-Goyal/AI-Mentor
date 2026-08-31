import { useEffect, useState } from "react";

import DashboardStats from "../../components/dashboard/DashboardStats";
import TopicExploration from "../../components/dashboard/TopicExploration";
import LanguageUsage from "../../components/dashboard/LanguageUsage";
import MentorInsight from "../../components/dashboard/MentorInsight";
import ContinueLearning from "../../components/dashboard/ContinueLearning";
import WeeklyActivity from "../../components/dashboard/WeeklyActivity";

import DashboardLayout from "../DashboardLayout/Dashboard";

import { getDashboard } from "../../api/dashboard";


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);


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

        <div className="flex min-h-full items-center justify-center bg-[#F8FAFC]">

          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>

        </div>

      </DashboardLayout>
    );

  }


  return (

    <DashboardLayout>

      <div className="min-h-full bg-[#F8FAFC] px-14 py-7">

        <div className="mx-auto w-full max-w-[1500px]">

          {/* Stats */}

          <DashboardStats
            data={dashboardData?.stats}
          />


          {/* Topic Exploration + Language Usage */}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

            <TopicExploration
              data={dashboardData?.topics}
            />

            <LanguageUsage
              data={dashboardData?.languages}
            />

          </div>


          {/* AI Mentor + Continue Learning */}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

            <MentorInsight
              data={dashboardData?.mentorInsight}
            />

            <ContinueLearning
              data={dashboardData?.continueLearning}
            />

          </div>


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