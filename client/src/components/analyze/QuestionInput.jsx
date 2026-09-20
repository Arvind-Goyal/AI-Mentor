import { useEffect, useState } from "react";
import { useAnalysis } from "../../context/AnalysisContext";
import { lookupQuestion } from "../../api/analysis";
import { Sparkles, CheckCircle2, Search, FileText } from "lucide-react";

const POPULAR_PROBLEMS = [
  { id: "1", title: "Two Sum", difficulty: "Easy" },
  { id: "20", title: "Valid Parentheses", difficulty: "Easy" },
  { id: "53", title: "Maximum Subarray", difficulty: "Medium" },
  { id: "121", title: "Best Time to Buy", difficulty: "Easy" },
  { id: "206", title: "Reverse Linked List", difficulty: "Easy" },
];

const QuestionInput = () => {
  const { problem, setProblem } = useAnalysis();
  const [activeTab, setActiveTab] = useState("leetcode"); // "leetcode" | "custom"
  const [detectedProblem, setDetectedProblem] = useState(null);
  const [searching, setSearching] = useState(false);

  // Debounced lookup when typing a number, url, or title in leetcode tab
  useEffect(() => {
    if (!problem || !problem.trim()) {
      setDetectedProblem(null);
      return;
    }

    // Only do fast lookup if single-line or under 150 chars
    const isLookupCandidate =
      problem.trim().length < 150 && !problem.trim().includes("\n");

    if (!isLookupCandidate) {
      // User likely pasted a full multi-line statement
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await lookupQuestion(problem.trim());
        if (res?.success && res?.problem) {
          setDetectedProblem(res.problem);
        } else {
          setDetectedProblem(null);
        }
      } catch (err) {
        setDetectedProblem(null);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [problem]);

  const handleSelectQuickProblem = (p) => {
    setActiveTab("leetcode");
    setProblem(p.id);
  };

  const getDifficultyBadge = (diff) => {
    if (diff === "Easy") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (diff === "Hard") return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="min-h-[350px] sm:h-[350px] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700 font-semibold text-sm">
            1
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Select or Paste Problem
            </h2>
            <p className="text-xs text-slate-500">
              Enter LeetCode question #, URL, or paste statement
            </p>
          </div>
        </div>

        {/* Mode Switch Pills */}
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("leetcode")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
              activeTab === "leetcode"
                ? "bg-white text-violet-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles size={13} />
            LeetCode
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("custom")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
              activeTab === "custom"
                ? "bg-white text-violet-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText size={13} />
            Custom
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
        {activeTab === "leetcode" ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                LeetCode Number, URL, or Slug
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="e.g. 1, #42, two-sum, or https://leetcode.com/problems/two-sum/"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pl-9 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-slate-400"
                />
                {searching && (
                  <span className="absolute right-3 top-2.5 text-xs text-violet-600 animate-pulse">
                    Detecting...
                  </span>
                )}
              </div>
            </div>

            {/* Live Detected Preview Pill */}
            {detectedProblem ? (
              <div className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50/60 px-3 py-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-600 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-900">
                      #{detectedProblem.frontendId} {detectedProblem.title}
                    </span>
                    <span className="ml-2 text-[11px] text-slate-500">
                      {(detectedProblem.topics || []).slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${getDifficultyBadge(
                      detectedProblem.difficulty
                    )}`}
                  >
                    {detectedProblem.difficulty}
                  </span>
                  {detectedProblem.hasCachedAnalysis && (
                    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                      ⚡ Instant
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Quick Suggestions */
              <div>
                <p className="text-[11px] font-medium text-slate-500 mb-1.5">
                  Popular Interview Starters:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_PROBLEMS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectQuickProblem(p)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50/60 hover:text-violet-700"
                    >
                      #{p.id} {p.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Custom Statement Textarea */
          <div className="h-full flex flex-col">
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows={4}
              placeholder="Paste custom problem statement, test cases, or constraints..."
              className="w-full flex-1 resize-none rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
          <span>
            {activeTab === "leetcode"
              ? "⚡ Instant responses for LeetCode dataset"
              : `${problem.length} / 5000 chars`}
          </span>
          <span className="font-medium text-violet-600">
            {activeTab === "leetcode" ? "Auto-detect # / URL" : "Markdown Supported"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionInput;