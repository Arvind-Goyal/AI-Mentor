import { ArrowRight, RefreshCw, Calendar } from "lucide-react";

const HistoryItem = ({ session, onContinue }) => {
  const title =
    session.title ||
    session.analysis?.problemTitle ||
    "Untitled Problem";

  const difficulty =
    session.difficulty ||
    session.analysis?.analysis?.difficulty ||
    "Medium";

  const language = session.language || "Java";
  const analysisCount = session.analysisCount || 1;

  const dateToDisplay = session.lastAnalyzedAt || session.updatedAt || session.createdAt;

  const getDifficultyBadge = (diff) => {
    const d = (diff || "").toLowerCase();
    if (d === "easy")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (d === "hard")
      return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 last:border-b-0 hover:bg-slate-50/80 transition-colors">
      {/* Problem Title & Badges */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2.5">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {title}
          </h3>

          <span
            className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold shrink-0 ${getDifficultyBadge(
              difficulty
            )}`}
          >
            {difficulty}
          </span>

          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 shrink-0">
            {language}
          </span>

          {analysisCount > 1 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700 border border-violet-200 shrink-0">
              <RefreshCw size={10} />
              Analyzed {analysisCount}x
            </span>
          )}
        </div>

        {session.analysis?.analysis?.summary && (
          <p className="mt-1 text-xs text-slate-500 line-clamp-1">
            {session.analysis.analysis.summary}
          </p>
        )}
      </div>

      {/* Time */}
      <div className="w-48 text-center shrink-0">
        <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
          <Calendar size={13} className="text-slate-400" />
          {dateToDisplay ? new Date(dateToDisplay).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) : "Recent"}
        </p>
      </div>

      {/* Continue */}
      <div className="w-28 flex justify-end shrink-0">
        <button
          type="button"
          onClick={() => onContinue(session)}
          className="flex items-center gap-1.5 rounded-xl bg-violet-50 px-3.5 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 hover:scale-105 active:scale-95"
        >
          Practice
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;