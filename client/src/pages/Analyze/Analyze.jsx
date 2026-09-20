import DashboardLayout from "../DashboardLayout/Dashboard";
import {
  QuestionInput,
  AnalysisConfig,
  AnalyzeButton,
} from "../../components/analyze";
import MentorPanel from "../../components/analyze/MentorPanel";
import AnalysisOverview from "../../components/analyze/AnalysisOverview";
import LearningJourney from "../../components/analyze/LearningJourney";
import { useAnalysis } from "../../context/AnalysisContext";
import MentorPreview from "../../components/analyze/MentorPreview";
import StartCodingCard from "../../components/analyze/StartCodingCard";

const Analyze = () => {
  const { analysisData, loading } = useAnalysis();

  const showMentor = analysisData.analysis && !loading;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
          {/* ================= Main Grid ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* ================= Left Section ================= */}
            <div className="xl:col-span-8 2xl:col-span-9 space-y-4 sm:space-y-5">
              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuestionInput />
                <AnalysisConfig />
              </div>

              {/* Analyze Button */}
              <div>
                <AnalyzeButton />
              </div>

              {/* Analysis Overview */}
              <div>
                <AnalysisOverview />
              </div>

              {/* Learning Journey */}
              {showMentor && (
                <div>
                  <LearningJourney />
                </div>
              )}

              {/* Editor button */}
              {showMentor && (
                <div>
                  <StartCodingCard />
                </div>
              )}
            </div>

            {/* ================= Mentor Panel ================= */}
            <div className="xl:col-span-4 2xl:col-span-3">
              <div className="xl:sticky xl:top-6 transition-all duration-300">
                {showMentor ? <MentorPanel /> : <MentorPreview />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analyze;