import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowUpRight, ExternalLink, Zap } from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

const RecommendedProblems = ({ problems = [] }) => {
  const navigate = useNavigate();
  const { setProblem } = useAnalysis();

  const handleAnalyze = (problem) => {
    setProblem(problem.frontendId || problem.slug);
    navigate("/analyze");
  };

  const getDifficultyBadge = (diff) => {
    if (diff === "Easy")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (diff === "Hard")
      return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Daily AI Challenges
            </h2>
            <p className="text-xs text-slate-500">
              Curated from LeetCode dataset for interview prep
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
          <Zap size={12} className="text-amber-500" />
          1-Click Analyze
        </span>
      </div>

      {/* Cards List */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {problems.map((prob) => (
          <div
            key={prob.slug}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-400">
                  #{prob.frontendId}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${getDifficultyBadge(
                    prob.difficulty
                  )}`}
                >
                  {prob.difficulty}
                </span>
              </div>

              <h3 className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1">
                {prob.title}
              </h3>

              {/* Topics */}
              <div className="mt-2 flex flex-wrap gap-1">
                {(prob.topics || []).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleAnalyze(prob)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-violet-600 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
              >
                Analyze
                <ArrowUpRight size={14} />
              </button>
              {prob.url && (
                <a
                  href={prob.url}
                  target="_blank"
                  rel="noreferrer"
                  title="View on LeetCode"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProblems;
