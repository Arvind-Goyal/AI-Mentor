const StatusCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-900">
        📊 Problem Status
      </h3>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">

        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>

        <span className="text-sm font-medium text-slate-700">
          Not Started
        </span>

      </div>

      {/* Stats */}
      <div className="mt-5 space-y-3">

        <div className="flex justify-between">

          <span className="text-sm text-slate-500">
            Estimated Time
          </span>

          <span className="font-medium">
            25 mins
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-sm text-slate-500">
            Difficulty
          </span>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Medium
          </span>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="flex justify-between text-xs text-slate-500 mb-2">

          <span>Progress</span>

          <span>0%</span>

        </div>

        <div className="h-2 rounded-full bg-slate-200">

          <div className="h-2 w-0 rounded-full bg-violet-600"></div>

        </div>

      </div>

    </div>
  );
};

export default StatusCard;