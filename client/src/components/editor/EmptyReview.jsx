import { FaRobot, FaCode, FaLightbulb, FaChartLine } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import { useEditor } from "../../context/EditorContext";

const EmptyReview = () => {
  const { reviewUserCode, reviewLoading } = useEditor();

  return (
    <div className="h-full flex items-center justify-center p-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full max-w-5xl">
        {/* Left */}
        <div className="flex-1 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto md:mx-0 shadow-sm">
            <FaRobot className="text-3xl text-violet-600" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            AI Code Review
          </h2>

          <p className="mt-2 text-slate-500 leading-relaxed max-w-md">
            Write your solution in the editor and request personalized feedback, time/space complexity analysis, and edge case detection from your AI DSA Mentor.
          </p>

          <button
            onClick={reviewUserCode}
            disabled={reviewLoading}
            className="mt-5 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm shadow-violet-500/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <FaRobot />
            <span>{reviewLoading ? "Analyzing Solution..." : "Review My Solution"}</span>
          </button>
        </div>

    {/* Right */}
    <div className="flex flex-col gap-3">

      <FeatureCard
        icon={<FaCode className="text-violet-600" />}
                      text="Logic Issues"
                      
      />

      <FeatureCard
        icon={<FaLightbulb className="text-amber-500" />}
        text="Suggestions"
      />

      <FeatureCard
        icon={<FaChartLine className="text-green-600" />}
        text="Complexity Analysis"
                  />
                

    </div>

  </div>

</div>
  );
};

export default EmptyReview;