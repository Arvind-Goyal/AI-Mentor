import { useAnalysis } from "../../context/AnalysisContext";

const statusColors = {
  "Not Started": "bg-red-500",
  "In Progress": "bg-yellow-500",
  "Completed": "bg-green-500",
};

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const StatusCard = () => {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const status = analysis.mentor.status;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-900">
        📊 Problem Status
      </h3>

      {/* Current Status */}
      <div className="mt-4 flex items-center gap-2">

        <div
          className={`h-2.5 w-2.5 rounded-full ${
            statusColors[status.state] || "bg-slate-400"
          }`}
        ></div>

        <span className="text-sm font-medium text-slate-700">
          {status.state}
        </span>

      </div>

      {/* Stats */}
      <div className="mt-5 space-y-3">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            Estimated Time
          </span>

          <span className="font-medium text-slate-800">
            {status.estimatedTime}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-500">
            Difficulty
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              difficultyColors[status.difficulty] ||
              "bg-slate-100 text-slate-700"
            }`}
          >
            {status.difficulty}
          </span>

        </div>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="mb-2 flex justify-between text-xs text-slate-500">

          <span>Progress</span>

          <span>{status.progress}%</span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-violet-600 transition-all duration-500"
            style={{
              width: `${status.progress}%`,
            }}
          ></div>

        </div>

      </div>

    </div>
  );
};

export default StatusCard;