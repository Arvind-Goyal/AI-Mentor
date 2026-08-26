import DashboardStats from "../../components/dashboard/DashboardStats";
import TopicExploration from "../../components/dashboard/TopicExploration";
import LanguageUsage from "../../components/dashboard/LanguageUsage";
import MentorInsight from "../../components/dashboard/MentorInsight";
import ContinueLearning from "../../components/dashboard/ContinueLearning";
import WeeklyActivity from "../../components/dashboard/WeeklyActivity";
import DashboardLayout from "../DashboardLayout/Dashboard";


const Dashboard = () => {

  return (
    <DashboardLayout>

      <div className="bg-[#F8FAFC]  px-20 py-7">


        {/* Stats */}
        <DashboardStats />


        {/* Exploration + Language */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          <TopicExploration />

          <LanguageUsage />

        </div>



        {/* AI Insight + Continue Learning */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          <MentorInsight />

          <ContinueLearning />

        </div>



        {/* Activity */}
        <div className="mt-6">

          <WeeklyActivity />

        </div>


      </div>

    </DashboardLayout>
  );
};


export default Dashboard;