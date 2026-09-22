import { useEffect, useState } from "react";

import DashboardLayout from "../DashboardLayout/Dashboard";
import DashboardHero from "../../components/dashboard/DashboardHero";
import DashboardStats from "../../components/dashboard/DashboardStats";
import RecommendedProblems from "../../components/dashboard/RecommendedProblems";
import TopicExploration from "../../components/dashboard/TopicExploration";
import LanguageUsage from "../../components/dashboard/LanguageUsage";
import MentorInsight from "../../components/dashboard/MentorInsight";
import WeeklyActivity from "../../components/dashboard/WeeklyActivity";

import { getDashboard } from "../../api/dashboard";
import { getCachedData } from "../../lib/cache";

const Dashboard = () => {
  const cached = getCachedData("dashboard_data", 5 * 60 * 1000);
  const [dashboardData, setDashboardData] = useState(cached);
  const [loading, setLoading] = useState(!cached);
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        if (isMounted) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center bg-[#F8FAFC]">
          <div className="text-center space-y-3">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-3 border-violet-600 border-t-transparent" />
            <p className="text-sm font-medium text-slate-500">
              Loading your mentor dashboard...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#F8FAFC] px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* 1. Hero Welcome & Analyze CTA */}
          <DashboardHero />

          {/* 2. Top Metric Cards */}
          <DashboardStats data={dashboardData?.stats} />

          {/* 3. Daily AI Recommended LeetCode Challenges */}
          {dashboardData?.recommendedProblems?.length > 0 && (
            <RecommendedProblems
              problems={dashboardData.recommendedProblems}
            />
          )}

          {/* 4. Topic + Language / Conditional Mentor Layout */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {/* Topic Exploration */}
            <TopicExploration
              data={dashboardData?.topics}
              showAll={showAllTopics}
              setShowAll={setShowAllTopics}
            />

            {/* Right column */}
            <div className="flex flex-col gap-6">
              <LanguageUsage data={dashboardData?.languages} />

              {/* Mentor shifts to right column only when topics are expanded */}
              {showAllTopics && (
                <MentorInsight data={dashboardData?.mentorInsight} />
              )}
            </div>
          </div>

          {/* Mentor stays full length below both cards when topics are collapsed */}
          {!showAllTopics && (
            <MentorInsight data={dashboardData?.mentorInsight} />
          )}

          {/* 5. Weekly Activity Chart */}
          <WeeklyActivity data={dashboardData?.weeklyActivity} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;