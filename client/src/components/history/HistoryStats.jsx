import { getHistoryStats } from "../../constants/historyStats";

const HistoryStats = ({ history }) => {
  const historyStats = getHistoryStats(history);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-4 sm:py-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-0 lg:divide-x divide-slate-200">
        {historyStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 p-2"
          >
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryStats;