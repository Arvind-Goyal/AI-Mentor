import { dummyAnalysis } from "../../constants/learningJourney.js";
import { useAnalysis } from "../../context/AnalysisContext";
import analyzeProblem from "../../services/analyzeService.js";
import { analyzeQuestion } from "../../api/analysis";
import axios from 'axios';

const AnalyzeButton = () => {
  
  const { setAnalysisData,analysisData } = useAnalysis();
  const {
    problem,
    language,
    mode,
    difficulty,
    loading,
    setLoading,
    setAnalysis,
    setError,
    setHistoryId,
  } = useAnalysis();

  const handleAnalyze = async () => {
    if (loading || !problem || !problem.trim()) {
      return;
    }
    // This is a new analysis session
    setHistoryId(null);
    setError(null);

    try {
      setLoading(true);
      const response = await analyzeQuestion({
        problem: problem.trim(),
        language,
        mode,
        difficulty,
      });

      setAnalysisData(response.data.data);
      setAnalysis(response.data.data);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to analyze problem";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = loading || !problem || !problem.trim();

  return (
    <button
      onClick={handleAnalyze}
      disabled={isButtonDisabled}
      className={`
        mt-4 sm:mt-6
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-indigo-600
        px-5 sm:px-8
        py-4 sm:py-6
        text-white
        shadow-lg
        transition
        duration-300
        ${
          isButtonDisabled
            ? "opacity-60 cursor-not-allowed shadow-none"
            : "hover:scale-[1.01] hover:shadow-xl cursor-pointer active:scale-95"
        }
      `}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="text-left min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold truncate">
            {loading ? "Analyzing Problem..." : "✨ Analyze Problem"}
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-violet-100 line-clamp-2">
            {loading
              ? "Please wait while AI is analyzing your problem (rate limit protected)..."
              : "AI will analyze your problem and generate your personalized learning roadmap."}
          </p>
        </div>

        {/* Right */}
        <div className="text-2xl sm:text-3xl shrink-0">
          {loading ? "⏳" : "→"}
        </div>
      </div>
    </button>
  );
};

export default AnalyzeButton;