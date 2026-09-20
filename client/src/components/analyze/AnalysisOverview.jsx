import React, { useState } from "react";
import { BarChart3, Clock3, Database, Tags } from "lucide-react";

import StatCard from "./StatCard";
import StatDetailModal from "./StatDetailModal";
import { useAnalysis } from "../../context/AnalysisContext";

const AnalysisOverview = () => {
  const { analysisData, loading } = useAnalysis();
  const [selectedStat, setSelectedStat] = useState(null);

  if (!analysisData.analysis && !loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <BarChart3 size={20} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Analysis Overview</h2>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500">
            Paste your problem and click Analyze.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            We'll detect difficulty, topics and generate your learning roadmap.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <BarChart3 size={20} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Analysis Overview</h2>
        </div>

        <div className="mt-8 space-y-3">
          <p className="flex items-center gap-2 font-medium text-slate-700">
            <Clock3 size={16} className="animate-pulse text-violet-600" />
            Analyzing...
          </p>
          <p className="text-slate-500">Finding Topics...</p>
          <p className="text-slate-500">Estimating Difficulty...</p>
          <p className="text-slate-500">Preparing Learning Roadmap...</p>
        </div>
      </div>
    );
  }

  const overview = analysisData.analysis || {};
  const mentor = analysisData.mentor || {};
  const optimized = analysisData.optimized || {};
  const complexity = optimized.complexity || {};

  const stats = [
    {
      id: "difficulty",
      title: "Difficulty",
      value: overview.difficulty || "Medium",
      subtitle: "AI Estimated",
      icon: BarChart3,
      bgColor: "bg-violet-100",
      textColor: "text-violet-600",
      details: {
        difficulty: overview.difficulty,
        estimatedTime: mentor.estimatedTime || "20-30 min",
        confidence: mentor.confidence,
        summary: overview.summary,
        goal: mentor.goal,
      },
    },
    {
      id: "pattern",
      title: "Pattern",
      value: Array.isArray(overview.concepts)
        ? overview.concepts.join(", ")
        : overview.concepts || "Pattern",
      rawItems: Array.isArray(overview.concepts) ? overview.concepts : [],
      subtitle: "Primary Concept",
      icon: Tags,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      details: {
        concepts: overview.concepts || [],
        approach: optimized.approach,
        companies: overview.companies || [],
        advice: mentor.advice,
      },
    },
    {
      id: "time",
      title: "Time Complexity",
      value: complexity.time || "O(n)",
      subtitle: "Expected Solution",
      icon: Clock3,
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
      details: {
        complexity: complexity.time || "O(n)",
        explanation: optimized.explanation,
        approach: optimized.approach,
      },
    },
    {
      id: "space",
      title: "Space Complexity",
      value: complexity.space || "O(1)",
      subtitle: "Expected Solution",
      icon: Database,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      details: {
        complexity: complexity.space || "O(1)",
        explanation: optimized.explanation,
        approach: optimized.approach,
      },
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            rawItems={stat.rawItems}
            subtitle={stat.subtitle}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
            onClick={() => setSelectedStat(stat)}
          />
        ))}
      </div>

      {/* Pop-up detail modal */}
      {selectedStat && (
        <StatDetailModal
          stat={selectedStat}
          onClose={() => setSelectedStat(null)}
        />
      )}
    </div>
  );
};

export default AnalysisOverview;