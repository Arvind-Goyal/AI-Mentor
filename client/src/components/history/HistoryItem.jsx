import { ArrowRight } from "lucide-react";

const HistoryItem = ({ session, onContinue }) => {
  return (
    <div className="flex items-center border-b border-slate-200 px-6 py-5 last:border-b-0 hover:bg-slate-50 transition-colors">
      
      {/* Problem Title */}
      <div className="flex-1 min-w-0">
        <h3 className="truncate text-lg font-semibold text-slate-900">
          {session.analysis.problemTitle}
        </h3>
      </div>

      {/* Time */}
      <div className="w-44 text-center">
        <p className="text-sm text-slate-500 whitespace-nowrap">
          {new Date(session.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Continue */}
      <div className="w-28 flex justify-end">
        <button
          onClick={() => onContinue(session)}
          className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default HistoryItem;