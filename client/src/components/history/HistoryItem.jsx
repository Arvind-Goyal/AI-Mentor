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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-5 last:border-b-0 hover:bg-slate-50/80 transition-colors">
      {/* Problem Title & Badges */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 truncate max-w-full sm:max-w-md">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 flex-wrap">
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
        </div>

        {session.analysis?.analysis?.summary && (
          <p className="mt-1 text-xs text-slate-500 line-clamp-1">
            {session.analysis.analysis.summary}
          </p>
        )}
      </div>

      {/* Meta info & Action Button on mobile / desktop */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Time */}
        <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
          <Calendar size={13} className="text-slate-400" />
          {dateToDisplay ? new Date(dateToDisplay).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) : "Recent"}
        </p>

        {/* Continue */}
        <button
          type="button"
          onClick={() => onContinue(session)}
          className="flex items-center gap-1.5 rounded-xl bg-violet-50 px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 active:scale-95 cursor-pointer"
        >
          Practice
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;