import {
    FaChartBar,
    FaTags,
    FaClock,
    FaDatabase
} from "react-icons/fa";

import StatCard from "./StatCard";
import { useAnalysis } from "../../context/AnalysisContext";

const AnalysisOverview = () => {

    const{analysis,loading} =  useAnalysis();
    if (!analysis && !loading) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">

            <h2 className="text-xl font-semibold text-slate-900">
                📊 Analysis Overview
            </h2>

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

            <h2 className="text-xl font-semibold">
                📊 Analysis Overview
            </h2>

            <div className="mt-8 space-y-3">

                <p>⏳ Analyzing...</p>

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
const overview = analysis.overview;
const stats = [

    {
        title: "Difficulty",
        value: overview.difficulty,
        subtitle: "AI Estimated",
        icon: <FaChartBar />
    },

    {
        title: "Pattern",
        value: overview.patterns?.join(', '),
        subtitle: "Primary Concept",
        icon: <FaTags />
    },

    {
        title: "Time Complexity",
        value: overview.timeComplexity,
        subtitle: "Expected Solution",
        icon: <FaClock />
    },

    {
        title: "Space Complexity",
        value: overview.spaceComplexity,
        subtitle: "Expected Solution",
        icon: <FaDatabase />
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