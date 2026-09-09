import { BarChart3, Clock3, Database, Tags } from "lucide-react";

import StatCard from "./StatCard";
import { useAnalysis } from "../../context/AnalysisContext";

const AnalysisOverview = () => {

    const { analysisData, loading } = useAnalysis();
    // console.log(loading);
    // console.log(analysisData.analysis);
    // console.log(analysis);
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

                <p className="text-slate-500">
                    Finding Topics...
                </p>

                <p className="text-slate-500">
                    Estimating Difficulty...
                </p>

                <p className="text-slate-500">
                    Preparing Learning Roadmap...
                </p>

            </div>

        </div>

    );
}
const overview = analysisData.analysis;
console.log(overview);
const stats = [

    {
        title: "Difficulty",
        value: overview.difficulty,
        subtitle: "AI Estimated",
        icon: BarChart3,
        bgColor: "bg-violet-100",
        iconColor: "text-violet-600",
    },

    {
        title: "Pattern",
        value: overview.concepts?.join(', '),
        subtitle: "Primary Concept",
        icon: Tags,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
    },

    {
        title: "Time Complexity",
        value: analysisData.optimized.complexity.time,
        subtitle: "Expected Solution",
        icon: Clock3,
        bgColor: "bg-amber-100",
        iconColor: "text-amber-600",
    },

    {
        title: "Space Complexity",
        value: analysisData.optimized.complexity.space,
        subtitle: "Expected Solution",
        icon: Database,
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
    }

];

return (

<div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">

   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
    {stats.map((stat) => (
        <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
        />
    ))}
</div>

</div>

);
};

export default AnalysisOverview;