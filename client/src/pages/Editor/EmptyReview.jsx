import { FaRobot, FaCode, FaLightbulb, FaChartLine } from "react-icons/fa";
import FeatureCard  from "./FeatureCard";
const EmptyReview = () => {
  return (
   <div className="h-full flex items-center justify-center px-8">

  <div className="flex items-center justify-between gap-12 w-full max-w-5xl">

    {/* Left */}
    <div className="flex-1">
      <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
        <FaRobot className="text-3xl text-violet-600" />
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-slate-900">
        AI Code Review
      </h2>

      <p className="mt-2 text-slate-500 leading-7">
        Write your solution and click
        <span className="font-medium text-violet-600"> AI Review </span>
        to receive personalized feedback on your code.
      </p>
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