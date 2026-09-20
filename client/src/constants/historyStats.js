export const getHistoryStats = (history = []) => {
  const totalSessions = history.length;

  const javaCount = history.filter(
    (item) => (item.language || "").toLowerCase() === "java"
  ).length;

  const cppCount = history.filter((item) => {
    const l = (item.language || "").toLowerCase();
    return l === "c++" || l === "cpp";
  }).length;

  const pythonCount = history.filter(
    (item) => (item.language || "").toLowerCase() === "python"
  ).length;

  const easyCount = history.filter((item) => {
    const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
    return d === "easy";
  }).length;

  const mediumCount = history.filter((item) => {
    const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
    return d === "medium";
  }).length;

  const hardCount = history.filter((item) => {
    const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
    return d === "hard";
  }).length;

  return [
    {
      label: "Problems",
      value: totalSessions,
      color: "text-slate-900",
    },
    {
      label: "Java",
      value: javaCount,
      color: "text-violet-600",
    },
    {
      label: "C++",
      value: cppCount,
      color: "text-blue-500",
    },
    {
      label: "Python",
      value: pythonCount,
      color: "text-green-500",
    },
    {
      label: "Easy",
      value: easyCount,
      color: "text-emerald-500",
    },
    {
      label: "Medium",
      value: mediumCount,
      color: "text-orange-500",
    },
    {
      label: "Hard",
      value: hardCount,
      color: "text-red-500",
    },
  ];
};