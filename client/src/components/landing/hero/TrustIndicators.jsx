import { CheckCircle2 } from "lucide-react";

const indicators = [
  "AI-Powered Learning",
  "Progressive Hints",
  "Personalized Feedback",
];

const TrustIndicators = () => {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {indicators.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-violet-600" />
          <span className="text-sm font-medium text-slate-600">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;