import { ArrowRight, Brain, Sparkles } from "lucide-react";

const AIReviewCard = () => {
  return (
    <div className="p-6">

      <div className="overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-blue-50">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-violet-100 px-5 py-4">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-2 text-white">
              <Brain className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                AI Mentor Feedback
              </h3>

              <p className="text-sm text-slate-500">
                Personalized guidance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Optimized
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-5">

          <p className="text-sm leading-7 text-slate-600">
            Excellent approach! You identified the correct pattern.
            Using a <span className="font-semibold text-violet-600">HashMap</span> reduces
            the complexity from <strong>O(n²)</strong> to{" "}
            <strong>O(n)</strong>.
          </p>

          <button className="group inline-flex items-center gap-2 font-medium text-violet-600 transition-colors hover:text-violet-700">
            Continue Learning
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

        </div>

      </div>

    </div>
  );
};

export default AIReviewCard;