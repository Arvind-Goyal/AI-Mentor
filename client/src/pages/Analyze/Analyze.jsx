import DashboardLayout from "../Dashboard/Dashboard";
import { QuestionInput,AnalysisConfig,AnalyzeButton } from "../../components/analyze";
import MentorPanel from "../../components/analyze/MentorPanel";

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* Question Card */}
                  <QuestionInput />

                {/* Configuration Card */}
                  <AnalysisConfig/>

              </div>

              {/* Analyze Button */}
              <div className="mt-6">

                <AnalyzeButton/>

              </div>

              {/* Analysis Overview */}
              <div className="mt-6">

                <div className="h-64 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">

                  <h2 className="text-xl font-semibold text-slate-400">
                    Analysis Overview
                  </h2>

                </div>

              </div>

              {/* Learning Journey */}
              <div className="mt-6">

                <div className="h-72 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">

                  <h2 className="text-xl font-semibold text-slate-400">
                    Learning Journey
                  </h2>

                </div>

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