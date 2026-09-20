import React, { useEffect } from "react";
import {
  X,
  Clock,
  ShieldCheck,
  Building2,
  Lightbulb,
  Cpu,
  Database,
  Tag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const StatDetailModal = ({ stat, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!stat) return null;

  const Icon = stat.icon;
  const { id, title, subtitle, bgColor, textColor, details = {} } = stat;

  const getDifficultyColor = (diff = "") => {
    const d = diff.toLowerCase();
    if (d === "easy") return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (d === "hard") return "bg-rose-100 text-rose-800 border-rose-300";
    return "bg-amber-100 text-amber-800 border-amber-300";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bgColor} ${textColor} shadow-inner`}>
              <Icon size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200/60 transition cursor-pointer"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
          {/* Section 1: Difficulty */}
          {id === "difficulty" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(details.difficulty)}`}>
                  {details.difficulty || stat.value || "Medium"}
                </span>
                {details.estimatedTime && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    <Clock size={13} className="text-slate-500" />
                    <span>Est. Time: {details.estimatedTime}</span>
                  </span>
                )}
                {details.confidence !== undefined && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>{details.confidence}% Confidence</span>
                  </span>
                )}
              </div>

              {details.summary && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-violet-600" />
                    Problem Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {details.summary}
                  </p>
                </div>
              )}

              {details.goal && (
                <div className="bg-violet-50/60 border border-violet-100 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">
                    Learning Target
                  </h4>
                  <p className="text-xs sm:text-sm text-violet-900 leading-relaxed">
                    {details.goal}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Section 2: Pattern / Concepts */}
          {id === "pattern" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Tag size={13} className="text-blue-600" />
                  Detected Algorithmic Concepts ({details.concepts?.length || 0})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.concepts && details.concepts.length > 0 ? (
                    details.concepts.map((c, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs"
                      >
                        <CheckCircle2 size={12} className="text-blue-500" />
                        <span>{c}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">{stat.value}</span>
                  )}
                </div>
              </div>

              {details.approach && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Lightbulb size={13} className="text-amber-500" />
                    Primary Algorithmic Strategy
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {details.approach}
                  </p>
                </div>
              )}

              {details.companies && details.companies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Building2 size={13} className="text-slate-600" />
                    Frequently Asked At
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {details.companies.map((comp, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 3: Time Complexity */}
          {id === "time" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-lg font-bold">
                  {stat.value || "O(n)"}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Expected Optimal Runtime
                </div>
              </div>

              {details.explanation ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Cpu size={13} className="text-amber-600" />
                    Runtime Complexity Analysis
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {details.explanation}
                  </p>
                </div>
              ) : details.approach ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Approach Details
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {details.approach}
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-600">
                  The optimal solution executes within {stat.value} time complexity by avoiding redundant iterations and leveraging direct indexing.
                </p>
              )}
            </div>
          )}

          {/* Section 4: Space Complexity */}
          {id === "space" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-lg font-bold">
                  {stat.value || "O(1)"}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Auxiliary Memory Overhead
                </div>
              </div>

              {details.explanation ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Database size={13} className="text-emerald-600" />
                    Memory Footprint Analysis
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {details.explanation}
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-600">
                  The optimal solution maintains an auxiliary memory overhead of {stat.value} by utilizing constant memory pointers and in-place transformations where applicable.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatDetailModal;
