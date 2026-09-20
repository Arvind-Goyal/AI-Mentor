import { createContext, useContext, useEffect, useState } from "react";
import { useAnalysis } from "./AnalysisContext";
import { runCode, reviewCode as apiReviewCode, fetchProblemTestCases } from "../api/editor";
import { toast } from "sonner";

const EditorContext = createContext();

export const detectMethodFromCode = (code) => {
  if (!code || typeof code !== "string") return null;
  const pyMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
  if (pyMatch && pyMatch[1] !== "__init__") return pyMatch[1];

  const jsMatch = code.match(/(?:function\s+([a-zA-Z0-9_]+)|(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:function|\([^)]*\)\s*=>))/);
  if (jsMatch && (jsMatch[1] || jsMatch[2])) return jsMatch[1] || jsMatch[2];

  const javaMatch = code.match(/(?:public|private|protected|static|\s)+\s+(?:[a-zA-Z0-9_<>[\]]+)\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/);
  if (javaMatch && javaMatch[1] && !["main", "if", "for", "while", "switch"].includes(javaMatch[1])) {
    return javaMatch[1];
  }

  return null;
};

export const EditorProvider = ({ children }) => {
  const { analysisData, setAnalysisData } = useAnalysis();
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");

  const [executionResult, setExecutionResult] = useState(null);
  const [running, setRunning] = useState(false);

  const [review, setReview] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("Testcases");
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);

  const [testCases, setTestCases] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loadingTestCases, setLoadingTestCases] = useState(false);

  const detectedMethod = detectMethodFromCode(code);

  const loadTestCases = async (query) => {
    const target = query || analysisData?.problemTitle || analysisData?.problemSlug || "Two Sum";
    setLoadingTestCases(true);
    try {
      const data = await fetchProblemTestCases(target);
      if (data?.testCases && data.testCases.length > 0) {
        setTestCases(data.testCases);
        if (data.metadata) setMetadata(data.metadata);
      }
    } catch (err) {
      console.warn("Could not auto-load test cases:", err.message);
    } finally {
      setLoadingTestCases(false);
    }
  };

  /**
   * Switches editor context to any LeetCode problem
   */
  const switchToProblem = async (problemQuery, shouldResetCode = true) => {
    setLoadingTestCases(true);
    try {
      const data = await fetchProblemTestCases(problemQuery);
      if (data?.title) {
        let starterCode = "";
        if (Array.isArray(data.codeSnippets)) {
          const langMatch = data.codeSnippets.find(
            (s) =>
              s.langSlug === language ||
              s.lang?.toLowerCase().includes(language)
          );
          if (langMatch) starterCode = langMatch.code;
        }

        const updatedAnalysis = {
          ...analysisData,
          problemTitle: data.title,
          problemSlug: data.slug,
          frontendId: data.frontendId,
          difficulty: data.difficulty || "Medium",
          summary: data.statementText || `${data.title} problem description.`,
          testCases: data.testCases || [],
          metadata: data.metadata || null,
        };

        setAnalysisData(updatedAnalysis);
        if (data.testCases && data.testCases.length > 0) {
          setTestCases(data.testCases);
          setActiveTestCaseIndex(0);
        }
        if (data.metadata) setMetadata(data.metadata);
        if (shouldResetCode && starterCode) {
          setCode(starterCode);
        }
        toast.success(`Switched to "${data.title}"`);
      }
    } catch (err) {
      console.error("Failed to switch problem:", err);
      toast.error("Could not load problem data.");
    } finally {
      setLoadingTestCases(false);
    }
  };

  // Sync test cases and metadata whenever analysisData updates
  useEffect(() => {
    if (analysisData?.testCases && analysisData.testCases.length > 0) {
      setTestCases(analysisData.testCases);
      if (analysisData.metadata) setMetadata(analysisData.metadata);
    } else {
      const target = analysisData?.problemTitle || analysisData?.problemSlug || "";
      if (target) {
        loadTestCases(target);
      }
    }
  }, [analysisData]);

  // Load starter template when problem or language changes
  useEffect(() => {
    if (analysisData?.template && analysisData.template[language]) {
      setCode(analysisData.template[language]);
    } else if (analysisData?.starterTemplates && analysisData.starterTemplates[language]) {
      setCode(analysisData.starterTemplates[language]);
    }
  }, [analysisData, language]);

  const updateTestCase = (index, field, value) => {
    setTestCases((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], [field]: value };
      }
      return next;
    });
  };

  const addTestCase = () => {
    const newIdx = testCases.length + 1;
    setTestCases((prev) => [
      ...prev,
      {
        caseIndex: newIdx,
        input: "",
        output: "",
        explanation: "",
      },
    ]);
    setActiveTestCaseIndex(testCases.length);
    toast.success(`Added Case ${newIdx}`);
  };

  const deleteTestCase = (index) => {
    if (testCases.length <= 1) {
      toast.error("You must keep at least one test case.");
      return;
    }
    setTestCases((prev) => prev.filter((_, i) => i !== index));
    if (activeTestCaseIndex >= index && activeTestCaseIndex > 0) {
      setActiveTestCaseIndex((prev) => prev - 1);
    }
  };

  const resetTestCases = async () => {
    const target = metadata?.title || metadata?.slug || analysisData?.problemTitle || analysisData?.problemSlug || "Two Sum";
    await loadTestCases(target);
    toast.info("Reset to default dataset test cases.");
  };

  const resetCode = () => {
    if (analysisData?.template && analysisData.template[language]) {
      setCode(analysisData.template[language]);
      toast.info("Code reset to starter template.");
    }
  };

  const changeLanguage = (lang) => {
    if (
      code &&
      analysisData?.template?.[language] &&
      code !== analysisData.template[language] &&
      !window.confirm("Changing the language will replace your current code. Continue?")
    ) {
      return;
    }

    setLanguage(lang);
    if (analysisData?.template?.[lang]) {
      setCode(analysisData.template[lang]);
    }
  };

  /**
   * Execute code for free via backend Wandbox runner against LeetCode test cases
   */
  const executeUserCode = async () => {
    if (!code || !code.trim()) {
      toast.error("Please enter some code to execute.");
      return;
    }

    setRunning(true);
    setActiveTab("Output");

    try {
      let effectiveTestCases = testCases;
      let effectiveMetadata = metadata;

      // Auto-reconcile if user's code method differs from current Reverse Linked List test cases
      if (detectedMethod) {
        const isReverseTestCase = testCases.some((tc) => tc && tc.input && tc.input.includes("head ="));
        const isMethodReverse = detectedMethod.toLowerCase().includes("reverse");

        if (isReverseTestCase && !isMethodReverse) {
          try {
            const fresh = await fetchProblemTestCases(detectedMethod);
            if (fresh?.testCases && fresh.testCases.length > 0) {
              effectiveTestCases = fresh.testCases;
              effectiveMetadata = fresh.metadata || effectiveMetadata;
              setTestCases(fresh.testCases);
              if (fresh.metadata) setMetadata(fresh.metadata);
              toast.info(`Auto-aligned test cases for detected function "${detectedMethod}".`);
            }
          } catch (e) {}
        }
      }

      const result = await runCode({
        language,
        code,
        stdin,
        testCases: effectiveTestCases,
        metadata: effectiveMetadata,
      });

      setExecutionResult(result);

      if (result.status === "Accepted") {
        toast.success(`Accepted! (${result.passedTestCases}/${result.totalTestCases} test cases passed)`);
      } else if (result.status === "Wrong Answer") {
        toast.error(`Wrong Answer (${result.passedTestCases}/${result.totalTestCases} test cases passed)`);
      } else if (result.status === "Success") {
        toast.success(`Executed successfully (${result.executionTime}ms)`);
      } else if (result.status === "Compilation Error") {
        toast.error("Compilation error detected.");
      } else if (result.status === "Runtime Error") {
        toast.error("Runtime error occurred during execution.");
      } else if (result.status === "Time Limit Exceeded") {
        toast.error("Execution timed out (15s limit).");
      }
    } catch (err) {
      console.error("Execution failed:", err);
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Execution service unavailable.";
      setExecutionResult({
        success: false,
        status: "Execution Failed",
        output: "",
        error: errMsg,
        executionTime: 0,
      });
      toast.error(errMsg);
    } finally {
      setRunning(false);
    }
  };

  /**
   * Review code with Gemini AI mentor
   */
  const reviewUserCode = async () => {
    if (!code || !code.trim()) {
      toast.error("Please write your solution before requesting AI Review.");
      return;
    }

    setReviewLoading(true);
    setActiveTab("AI Review");

    try {
      const problemSummary =
        analysisData?.analysis?.summary ||
        analysisData?.problemTitle ||
        "Data Structures and Algorithms Problem";

      const data = await apiReviewCode({
        problem: problemSummary,
        language,
        code,
      });

      setReview(data.review);
      toast.success("AI Mentor review ready!");
    } catch (err) {
      console.error("Review failed:", err);
      toast.error("Failed to generate AI review. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  };

  const value = {
    language,
    setLanguage: changeLanguage,

    code,
    setCode,

    stdin,
    setStdin,

    testCases,
    setTestCases,
    metadata,
    loadingTestCases,
    loadTestCases,
    switchToProblem,
    updateTestCase,
    addTestCase,
    deleteTestCase,
    resetTestCases,
    detectedMethod,

    activeTestCaseIndex,
    setActiveTestCaseIndex,

    executionResult,
    setExecutionResult,

    running,
    setRunning,

    executeUserCode,
    reviewUserCode,

    review,
    setReview,

    reviewLoading,
    setReviewLoading,

    activeTab,
    setActiveTab,

    resetCode,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);