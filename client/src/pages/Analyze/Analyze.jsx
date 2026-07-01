import DashboardLayout from "../Dashboard/Dashboard";
import { QuestionInput,AnalysisConfig,AnalyzeButton } from "../../components/analyze";
import MentorPanel from "../../components/analyze/MentorPanel";
import AnalysisOverview from "../../components/analyze/AnalysisOverview";
import LearningJourney from "../../components/analyze/LearningJourney";

const Analyze = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8FAFC]">

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* ================= Header ================= */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            {/* Left */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Analyze Problem
              </h1>

              <p className="text-slate-500 mt-2 text-lg">
                Get AI-powered analysis and learn step by step.
              </p>
            </div>

            {/* Right */}
            <button
              className="
                px-5
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-sm
                hover:shadow-md
                transition
                duration-300
              "
            >
              How it Works
            </button>

          </div>

          {/* ================= Main Grid ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* ================= Left Section ================= */}
            <div className="xl:col-span-9">

              {/* Top Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">

                {/* Question Card */}
                  <QuestionInput />

                {/* Configuration Card */}
                  <AnalysisConfig/>

              </div>

              {/* Analyze Button */}
              <div className="mt-1">

                <AnalyzeButton/>

              </div>

              {/* Analysis Overview */}
              <div className="mt-1">
                  <AnalysisOverview/>
              </div>

              {/* Learning Journey */}
              <div className="mt-1">

                {/* <div className="h-72 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center"> */}

                  <LearningJourney/>

                {/* </div> */}

              </div>

            </div>

            {/* ================= Right Section ================= */}
            <div className="xl:col-span-3">

              <div className="min-h-[900px] px-4 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                  <MentorPanel/>
              </div>


            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Analyze;