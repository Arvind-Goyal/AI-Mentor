import { Sparkles } from "lucide-react";

const HeroBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2">
      <Sparkles className="h-4 w-4 text-violet-600" />

      <span className="text-sm font-medium text-violet-700">
        Your Personal AI Mentor for DSA
      </span>
    </div>
  );
};

export default HeroBadge;