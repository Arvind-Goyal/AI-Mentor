import {
  FaArrowLeft,
  FaPlay,
  FaRobot,
  FaRedo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEditor } from "../../context/EditorContext";
import axios from "axios";
import { useAnalysis } from "../../context/AnalysisContext";
import { reviewSolution } from "../../api/analysis";
const Toolbar = () => {
  const navigate = useNavigate();
  const { language, setLanguage, resetCode, setReview,
    review, activeTab, setActiveTab, reviewLoading, setReviewLoading,code } = useEditor();
  const { analysisData} = useAnalysis();
  
  const handleReview = async () => {

    setReviewLoading(true);

    setActiveTab("review");

    try{

        const {data} = await reviewSolution({

            problem: analysisData.analysis.summary,

            language,

            code

        });

        setReview(data.review);

    }catch (err) {

    console.error(err);

} 

    finally{

        setReviewLoading(false);

    }

}

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-4">

      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/analyze")}
            className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="h-6 w-px bg-slate-200" />

          <h2 className="text-xl font-semibold text-slate-900">
            Two Sum
          </h2>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Language */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          {/* Reset */}
          <button onClick={resetCode} className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50 transition">
            <FaRedo />
            Reset
          </button>

          {/* Run */}
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition">
            <FaPlay />
            Run Code
          </button>

          {/* AI Review */}
          <button
            onClick={handleReview}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 transition">
            <FaRobot />
            AI Review
          </button>

        </div>

      </div>

    </div>
  );
};

export default Toolbar;