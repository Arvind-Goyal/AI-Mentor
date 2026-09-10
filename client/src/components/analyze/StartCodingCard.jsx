import { FaArrowRight, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

import { useAnalysis } from "../../context/AnalysisContext";
import { useAuth } from "../../context/AuthContext";

const StartCodingCard = () => {
  const navigate = useNavigate();

  const {
    problem,
    language,
    analysisData,
    setHistoryId,
  } = useAnalysis();

  const { user } = useAuth();

  const handleStartCoding = async () => {
    try {
      if (!user?._id || !problem || !analysisData?.analysis) {
        return;
      }

      const response = await api.post(
        "/history",
        {
          userId: user._id,
          title: problem,
          language,
          analysis: analysisData,
        },
        {
          withCredentials: true,
        }
      );

      // Store the MongoDB history ID
      setHistoryId(response.data.history._id);

      // Open editor
      navigate("/editor");
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  return (
    <div className="mt-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
              <FaCode className="text-white text-xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Practice Your Solution
              </h2>

              <p className="text-violet-100 mt-1">
                You've completed the analysis. Put your understanding into practice in the built-in editor.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartCoding}
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition-all hover:scale-105 hover:shadow-lg"
        >
          Continue to Editor
          <FaArrowRight />
        </button>

      </div>
    </div>
  );
};

export default StartCodingCard;