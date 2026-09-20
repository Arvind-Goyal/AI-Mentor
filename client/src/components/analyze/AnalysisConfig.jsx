import { useAnalysis } from "../../context/AnalysisContext";

const AnalysisConfig = () => {
  const {
    language,
    setLanguage,
    mode,
    setMode,
    difficulty,
    setDifficulty,
  } = useAnalysis();

  return (
    <div className="min-h-[350px] sm:h-[350px] flex flex-col justify-between rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-semibold text-sm">
          2
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Analysis Configuration
          </h2>
          <p className="text-xs text-slate-500">
            Customize how AI should analyze your problem.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {/* Language */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Programming Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
          >
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>

        {/* Mode */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Analysis Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
          >
            <option value="Detailed">Detailed (In-depth algorithmic roadmap)</option>
            <option value="Quick">Quick (High-level insights & pattern)</option>
            <option value="Interview">Interview Prep (Mock hints & pitfalls)</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
          >
            <option value="Auto Detect">Auto Detect (Use LeetCode rating)</option>
            <option value="Easy">Easy (Beginner-friendly breakdown)</option>
            <option value="Medium">Medium (Standard interview level)</option>
            <option value="Hard">Hard (Advanced optimization focus)</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Active: {language} • {mode}</span>
        <span className="text-violet-600 font-medium">Ready to Analyze</span>
      </div>
    </div>
  );
};

export default AnalysisConfig;