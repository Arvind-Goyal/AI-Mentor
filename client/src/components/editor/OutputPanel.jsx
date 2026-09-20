import { useState } from "react";
import { useEditor } from "../../context/EditorContext";
import EmptyReview from "./EmptyReview";
import ReviewPanel from "./ReviewPanel";
import {
  FaFlask,
  FaTerminal,
  FaRobot,
  FaKeyboard,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaClock,
  FaCopy,
  FaCheck,
  FaPlay,
  FaSpinner,
  FaTrashAlt,
  FaTimes,
  FaPlus,
  FaUndo,
} from "react-icons/fa";
import { toast } from "sonner";

const TABS = [
  { id: "Testcases", label: "Testcases", icon: FaFlask },
  { id: "Output", label: "Test Result", icon: FaTerminal },
  { id: "Custom Input", label: "Custom Input", icon: FaKeyboard },
  { id: "AI Review", label: "AI Review", icon: FaRobot },
];

const OutputPanel = () => {
  const {
    activeTab,
    setActiveTab,
    testCases,
    metadata,
    activeTestCaseIndex,
    setActiveTestCaseIndex,
    loadingTestCases,
    loadTestCases,
    updateTestCase,
    addTestCase,
    deleteTestCase,
    resetTestCases,
    executionResult,
    setExecutionResult,
    running,
    executeUserCode,
    stdin,
    setStdin,
    review,
    reviewLoading,
  } = useEditor();

  const [copied, setCopied] = useState(false);
  const [selectedResultCaseIndex, setSelectedResultCaseIndex] = useState(0);

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Output copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearOutput = () => {
    setExecutionResult(null);
  };

  const currentTestCase = testCases && testCases.length > 0
    ? testCases[activeTestCaseIndex] || testCases[0]
    : null;

  const currentResultCase = executionResult?.testResults && executionResult.testResults.length > 0
    ? executionResult.testResults[selectedResultCaseIndex] || executionResult.testResults[0]
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[360px]">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 bg-slate-50/50">
        <div className="flex overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-sm font-semibold transition border-b-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "border-violet-600 text-violet-700 bg-white shadow-xs"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <Icon className={isActive ? "text-violet-600" : "text-slate-400"} />
                <span>{tab.label}</span>

                {tab.id === "Testcases" && testCases && testCases.length > 0 && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                    {testCases.length}
                  </span>
                )}

                {tab.id === "Output" && executionResult && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      executionResult.status === "Accepted"
                        ? "bg-emerald-500"
                        : executionResult.status === "Wrong Answer"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
                  />
                )}

                {tab.id === "Custom Input" && stdin.trim() && (
                  <span className="w-2 h-2 rounded-full bg-violet-600" title="Custom stdin provided" />
                )}

                {tab.id === "AI Review" && review && (
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {activeTab === "Output" && executionResult && (
            <button
              onClick={clearOutput}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
              title="Clear output console"
            >
              <FaTrashAlt className="text-xs" />
              <span>Clear</span>
            </button>
          )}

          {activeTab === "Custom Input" && stdin && (
            <button
              onClick={() => setStdin("")}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
            >
              <FaTrashAlt className="text-xs" />
              <span>Clear Input</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-5 flex-1 overflow-y-auto">
        {/* Tab 1: Testcases from Dataset */}
        {activeTab === "Testcases" && (
          <div className="space-y-4">
            {testCases && testCases.length > 0 ? (
              <div className="space-y-4">
                {/* Header Bar with Problem info & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {metadata?.title ? (
                        <>
                          <span className="text-violet-600 font-mono">#{metadata.frontendId || ""}</span> {metadata.title}
                        </>
                      ) : (
                        "Test Cases"
                      )}
                    </span>
                    {metadata?.difficulty && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          metadata.difficulty.toLowerCase() === "easy"
                            ? "bg-emerald-100 text-emerald-700"
                            : metadata.difficulty.toLowerCase() === "hard"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {metadata.difficulty}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={addTestCase}
                      className="inline-flex items-center gap-1.5 text-xs text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200/70 font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer"
                      title="Add a custom test case"
                    >
                      <FaPlus className="text-[10px]" />
                      <span>Add Case</span>
                    </button>
                    <button
                      onClick={resetTestCases}
                      disabled={loadingTestCases}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 font-medium px-3 py-1.5 rounded-xl transition cursor-pointer disabled:opacity-50"
                      title="Reset to original dataset test cases"
                    >
                      <FaUndo className="text-[10px]" />
                      <span>Reset Standard</span>
                    </button>
                  </div>
                </div>

                {/* Case Selector Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {testCases.map((tc, idx) => (
                    <div key={idx} className="flex items-center">
                      <button
                        onClick={() => setActiveTestCaseIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                          activeTestCaseIndex === idx
                            ? "bg-violet-600 text-white shadow-sm shadow-violet-500/20"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <span>Case {idx + 1}</span>
                        {testCases.length > 1 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTestCase(idx);
                            }}
                            title="Delete this test case"
                            className={`p-0.5 rounded-full hover:bg-rose-500 hover:text-white transition ${
                              activeTestCaseIndex === idx ? "text-violet-200" : "text-slate-400"
                            }`}
                          >
                            <FaTimes className="text-[9px]" />
                          </span>
                        )}
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addTestCase}
                    className="p-1.5 px-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-violet-600 hover:border-violet-400 transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Add another test case"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Case</span>
                  </button>
                </div>

                {/* Case Details Editor */}
                {currentTestCase && (
                  <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                    {/* Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Input
                        </span>
                        <span className="text-[11px] text-slate-400">Editable</span>
                      </div>
                      <textarea
                        value={currentTestCase.input || ""}
                        onChange={(e) => updateTestCase(activeTestCaseIndex, "input", e.target.value)}
                        placeholder="e.g. nums = [2,7,11,15], target = 9 or head = [1,2,3,4,5]"
                        rows={2}
                        className="w-full bg-white border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-y"
                      />
                    </div>

                    {/* Expected Output */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Expected Output
                        </span>
                        <span className="text-[11px] text-slate-400">Editable</span>
                      </div>
                      <textarea
                        value={currentTestCase.output || ""}
                        onChange={(e) => updateTestCase(activeTestCaseIndex, "output", e.target.value)}
                        placeholder="e.g. [0,1] or true"
                        rows={2}
                        className="w-full bg-white border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-y"
                      />
                    </div>

                    {/* Explanation */}
                    {currentTestCase.explanation !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            Explanation (Optional)
                          </span>
                        </div>
                        <input
                          type="text"
                          value={currentTestCase.explanation || ""}
                          onChange={(e) => updateTestCase(activeTestCaseIndex, "explanation", e.target.value)}
                          placeholder="Optional explanation notes for this case"
                          className="w-full text-xs sm:text-sm text-slate-700 bg-white border border-slate-200 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                        />
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                      {testCases.length > 1 ? (
                        <button
                          onClick={() => deleteTestCase(activeTestCaseIndex)}
                          className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition cursor-pointer font-medium"
                        >
                          <FaTrashAlt className="text-xs" />
                          <span>Delete Case {activeTestCaseIndex + 1}</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        onClick={executeUserCode}
                        disabled={running}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50 ml-auto"
                      >
                        {running ? (
                          <>
                            <FaSpinner className="animate-spin text-xs" />
                            <span>Running Test Cases...</span>
                          </>
                        ) : (
                          <>
                            <FaPlay className="text-xs" />
                            <span>Run All Test Cases</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : loadingTestCases ? (
              <div className="py-14 flex flex-col items-center justify-center text-center">
                <FaSpinner className="text-3xl text-violet-600 animate-spin mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  Loading Test Cases from LeetCode Dataset...
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Extracting standard example testcases and problem inputs.
                </p>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-3 shadow-inner">
                  <FaFlask className="text-2xl" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  Load Standard Test Cases
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
                  Load standard example test cases directly from the LeetCode dataset to run automated tests on your solution, or create custom ones.
                </p>
                <div className="mt-4 flex items-center gap-3 flex-wrap justify-center">
                  <button
                    onClick={() => loadTestCases()}
                    disabled={loadingTestCases}
                    className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-violet-500/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <FaFlask className="text-xs" />
                    <span>Load Standard Test Cases</span>
                  </button>
                  <button
                    onClick={addTestCase}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    <FaPlus className="text-xs" />
                    <span>Create Custom Case</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Test Result & Output */}
        {activeTab === "Output" && (
          <div className="space-y-4">
            {running ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <FaSpinner className="text-4xl text-emerald-600 animate-spin mb-4" />
                <h3 className="text-base font-semibold text-slate-800">
                  Executing your code against LeetCode test cases...
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Running on the free Wandbox compiler engine with automated test validation.
                </p>
              </div>
            ) : executionResult ? (
              <div className="space-y-4">
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status Badge */}
                    {executionResult.status === "Accepted" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <FaCheckCircle className="text-emerald-600 text-sm" />
                        Accepted
                      </span>
                    ) : executionResult.status === "Wrong Answer" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        <FaTimesCircle className="text-rose-600 text-sm" />
                        Wrong Answer
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
                        {executionResult.status}
                      </span>
                    )}

                    {/* Test cases passed count */}
                    {executionResult.totalTestCases !== null && executionResult.totalTestCases !== undefined && (
                      <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        {executionResult.passedTestCases} / {executionResult.totalTestCases} Testcases Passed
                      </span>
                    )}

                    {/* Runtime */}
                    <span className="text-xs text-slate-600 font-medium">
                      ⏱ Runtime:{" "}
                      <strong className="text-slate-800">
                        {executionResult.executionTime} ms
                      </strong>
                    </span>
                  </div>

                  {executionResult.output && (
                    <button
                      onClick={() => handleCopy(executionResult.output)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-violet-600 bg-white border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <FaCheck className="text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          <span>Copy Output</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Structured Test Results Breakdown */}
                {executionResult.testResults && executionResult.testResults.length > 0 && (
                  <div className="space-y-3">
                    {/* Result Case Tabs */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {executionResult.testResults.map((tr, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedResultCaseIndex(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            selectedResultCaseIndex === idx
                              ? tr.passed
                                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20"
                                : "bg-rose-600 text-white shadow-sm shadow-rose-500/20"
                              : tr.passed
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          {tr.passed ? <FaCheck className="text-[10px]" /> : <FaTimes className="text-[10px]" />}
                          <span>Case {tr.caseIndex || idx + 1}</span>
                        </button>
                      ))}
                    </div>

                    {/* Active Test Result Detail */}
                    {currentResultCase && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Input
                          </span>
                          <pre className="mt-1 bg-white border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm p-3 rounded-xl overflow-x-auto whitespace-pre-wrap">
                            {currentResultCase.input}
                          </pre>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                              Your Output
                            </span>
                            <pre
                              className={`mt-1 font-mono text-xs sm:text-sm p-3 rounded-xl overflow-x-auto whitespace-pre-wrap border ${
                                currentResultCase.passed
                                  ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                                  : "bg-rose-50/70 border-rose-200 text-rose-900"
                              }`}
                            >
                              {currentResultCase.actual}
                            </pre>
                          </div>

                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                              Expected Output
                            </span>
                            <pre className="mt-1 bg-white border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm p-3 rounded-xl overflow-x-auto whitespace-pre-wrap">
                              {currentResultCase.expected}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Standard Output (stdout logs if user printed) */}
                {executionResult.output ? (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                      Stdout / Console Logs
                    </span>
                    <pre className="bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner selection:bg-emerald-800 selection:text-white max-h-56">
                      {executionResult.output}
                    </pre>
                  </div>
                ) : null}

                {/* Diagnostic Error */}
                {executionResult.error ? (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold text-rose-600 tracking-wide uppercase">
                      Diagnostic / Error (stderr)
                    </span>
                    <pre className="bg-rose-950/30 border border-rose-900/40 text-rose-300 font-mono text-xs sm:text-sm p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner max-h-56">
                      {executionResult.error}
                    </pre>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="py-14 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                  <FaTerminal className="text-2xl" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No Execution Output Yet
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-md">
                  Write your solution in the editor and click <strong className="text-emerald-600">Run Code</strong> to execute it against the problem test cases.
                </p>
                <button
                  onClick={executeUserCode}
                  className="mt-4 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <FaPlay className="text-xs" />
                  <span>Run Code Now</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Custom Input (stdin) */}
        {activeTab === "Custom Input" && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Custom Standard Input (stdin)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Provide custom input data passed to your program via <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-[11px]">cin</code>, <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-[11px]">Scanner</code>, <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-[11px]">sys.stdin</code>, etc.
              </p>
            </div>

            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Enter stdin input here, one entry or line per row..."
              rows={6}
              className="w-full font-mono text-sm p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-y"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
              <span>Lines: {stdin ? stdin.split("\n").length : 0} | Characters: {stdin.length}</span>
              <button
                onClick={executeUserCode}
                disabled={running}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-1.5 rounded-lg transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <FaPlay className="text-[10px]" />
                <span>Run with this Input</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: AI Review */}
        {activeTab === "AI Review" && (
          <div>
            {reviewLoading ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <FaSpinner className="text-4xl text-violet-600 animate-spin mb-4" />
                <h3 className="text-base font-semibold text-slate-800">
                  Analyzing your code with Gemini AI DSA Mentor...
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Evaluating logic correctness, algorithmic edge cases, and calculating precise time & space complexity.
                </p>
              </div>
            ) : review ? (
              <ReviewPanel />
            ) : (
              <EmptyReview />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;