import { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaPlay,
  FaRobot,
  FaRedo,
  FaSpinner,
  FaSearch,
  FaExchangeAlt,
  FaTimes,
  FaLightbulb,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEditor } from "../../context/EditorContext";
import { useAnalysis } from "../../context/AnalysisContext";
import { searchDatasetProblems } from "../../api/editor";

const Toolbar = () => {
  const navigate = useNavigate();
  const {
    language,
    setLanguage,
    resetCode,
    executeUserCode,
    reviewUserCode,
    running,
    reviewLoading,
    switchToProblem,
    detectedMethod,
    testCases,
  } = useEditor();
  const { analysisData } = useAnalysis();

  const title = analysisData?.problemTitle || "DSA Problem Solver";

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef(null);

  // Load initial problems when search modal opens
  useEffect(() => {
    if (showSearchModal) {
      handleSearch("");
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearchModal]);

  const handleSearch = async (q) => {
    setSearchQuery(q);
    setSearching(true);
    try {
      const data = await searchDatasetProblems(q);
      setSearchResults(data.problems || []);
    } catch (err) {
      console.warn("Problem search failed:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectProblem = (p) => {
    switchToProblem(p.slug || p.title);
    setShowSearchModal(false);
  };

  // Check if detected code method mismatches current test cases
  const isReverseTestCase = testCases.some((tc) => tc && tc.input && tc.input.includes("head ="));
  const isMethodReverse = detectedMethod?.toLowerCase().includes("reverse");
  const hasMismatch = Boolean(detectedMethod && isReverseTestCase && !isMethodReverse);

  return (
    <div className="space-y-2">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Back button & Title with Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-wrap">
            <button
              onClick={() => navigate("/analyze")}
              className="flex items-center gap-1.5 sm:gap-2 text-slate-600 hover:text-violet-600 font-medium transition cursor-pointer shrink-0 text-xs sm:text-sm"
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
              <span>Back</span>
            </button>

            <div className="h-5 sm:h-6 w-px bg-slate-200 shrink-0" />

            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {title}
              </h2>

              <button
                onClick={() => setShowSearchModal(true)}
                className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg border border-violet-200 transition cursor-pointer shrink-0"
                title="Switch to another LeetCode problem"
              >
                <FaExchangeAlt className="text-[10px]" />
                <span className="hidden xs:inline sm:inline">Switch</span>
                <span className="hidden sm:inline">Problem</span>
              </button>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={running}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition cursor-pointer disabled:opacity-60"
            >
              <option value="java">Java (OpenJDK 21)</option>
              <option value="cpp">C++ (GCC 13)</option>
              <option value="python">Python (3.12)</option>
              <option value="javascript">JavaScript (Node 20)</option>
            </select>

            {/* Reset Code */}
            <button
              onClick={resetCode}
              disabled={running}
              title="Reset to starter template"
              className="flex items-center gap-2 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-3.5 py-2 text-sm font-medium transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <FaRedo className="text-xs text-slate-500" />
              <span>Reset</span>
            </button>

            {/* Run Code */}
            <button
              onClick={executeUserCode}
              disabled={running}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-95 cursor-pointer ${
                running
                  ? "bg-emerald-400 cursor-not-allowed opacity-80"
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
              }`}
            >
              {running ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <FaPlay className="text-xs" />
                  <span>Run Code</span>
                </>
              )}
            </button>

            {/* AI Review */}
            <button
              onClick={reviewUserCode}
              disabled={reviewLoading || running}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-95 cursor-pointer ${
                reviewLoading
                  ? "bg-violet-400 cursor-not-allowed opacity-80"
                  : "bg-violet-600 hover:bg-violet-700 shadow-violet-500/20"
              }`}
            >
              {reviewLoading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Reviewing...</span>
                </>
              ) : (
                <>
                  <FaRobot className="text-sm" />
                  <span>AI Review</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Auto-detected Mismatch Notification Banner */}
      {hasMismatch && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center justify-between gap-4 text-amber-900 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <FaLightbulb className="text-amber-600 shrink-0 text-base" />
            <p className="truncate">
              Your code defines function <span className="font-mono font-bold text-amber-950">"{detectedMethod}"</span>, but test cases are currently set for Reverse Linked List.
            </p>
          </div>
          <button
            onClick={() => switchToProblem(detectedMethod, false)}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shadow-sm"
          >
            Load Test Cases for "{detectedMethod}"
          </button>
        </div>
      )}

      {/* Problem Switcher Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header & Search Input */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-800">
                  Switch Problem & Test Cases
                </h3>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="relative">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search problem # or title (e.g. #1, Two Sum, Valid Parentheses)..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                />
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-2">
              {searching ? (
                <div className="py-8 flex justify-center text-slate-400">
                  <FaSpinner className="animate-spin text-xl text-violet-600" />
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((p) => {
                  const diffColor =
                    p.difficulty?.toLowerCase() === "easy"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : p.difficulty?.toLowerCase() === "hard"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-amber-50 text-amber-700 border-amber-200";

                  return (
                    <button
                      key={p.slug || p.frontendId}
                      onClick={() => handleSelectProblem(p)}
                      className="w-full text-left p-3 hover:bg-violet-50/60 rounded-xl transition flex items-center justify-between group cursor-pointer"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">
                            #{p.frontendId}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-violet-700 truncate">
                            {p.title}
                          </h4>
                        </div>
                        {p.topics && p.topics.length > 0 && (
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                            {p.topics.slice(0, 3).join(" • ")}
                          </p>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${diffColor}`}
                      >
                        {p.difficulty || "Medium"}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No problems found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <p className="text-[11px] text-slate-500">
                Selecting a problem updates test cases, descriptions, and starter code.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;