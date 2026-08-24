export const getHistoryStats = (history) => {
  const totalSessions = history.length;

  const javaCount = history.filter(
    (item) => item.language === "Java"
  ).length;

  const cppCount = history.filter(
    (item) => item.language === "C++"
  ).length;

  const pythonCount = history.filter(
    (item) => item.language === "Python"
  ).length;

  const easyCount = history.filter(
    (item) => item.analysis?.analysis?.difficulty === "Easy"
  ).length;

  const mediumCount = history.filter(
    (item) => item.analysis?.analysis?.difficulty === "Medium"
  ).length;

  const hardCount = history.filter(
    (item) => item.analysis?.analysis?.difficulty === "Hard"
  ).length;

  return [
    {
      label: "Sessions",
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