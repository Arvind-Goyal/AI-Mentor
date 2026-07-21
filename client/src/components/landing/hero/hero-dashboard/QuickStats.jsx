import {
  GitBranch,
  Zap,
  Lightbulb,
} from "lucide-react";

const stats = [
  {
    icon: GitBranch,
    title: "Pattern",
    value: "HashMap",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Zap,
    title: "Complexity",
    value: "O(n)",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Lightbulb,
    title: "AI Hints",
    value: "3 Available",
    color: "bg-amber-100 text-amber-600",
  },
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4 border-b border-slate-100 px-6 py-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`mb-3 inline-flex rounded-xl p-2 ${stat.color}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <p className="text-sm text-slate-500">
              {stat.title}
            </p>

            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;