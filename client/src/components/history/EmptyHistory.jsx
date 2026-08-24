import { History, ArrowRight } from "lucide-react";

const EmptyHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
      <History className="mb-4 text-violet-600" size={36} />

      <h2 className="text-xl font-semibold text-slate-900">
        No more sessions yet
      </h2>

      <p className="mt-2 text-slate-500">
        Analyze a problem and your learning history will appear here.
      </p>

      <button className="mt-6 flex items-center gap-2 font-medium text-violet-600">
        Analyze a Problem
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default EmptyHistory;