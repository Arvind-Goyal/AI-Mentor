import { getHistoryStats } from "../../constants/historyStats";

const HistoryStats = ({ history }) => {
  const historyStats = getHistoryStats(history);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
      <div className="grid grid-cols-7 divide-x divide-slate-200">
        {historyStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1"
          >
            <h2 className={`text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </h2>

            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryStats;