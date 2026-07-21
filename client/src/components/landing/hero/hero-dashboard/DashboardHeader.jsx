import { Brain, Clock3 } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

      {/* Left */}
      <div>
        <div className="flex items-center gap-2 text-violet-600">
          <Brain className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Problem Analysis
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Two Sum
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Arrays • HashMap
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-3">

        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
          Medium
        </span>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 className="h-4 w-4" />
          <span>15 min</span>
        </div>

      </div>

    </div>
  );
};

export default DashboardHeader;