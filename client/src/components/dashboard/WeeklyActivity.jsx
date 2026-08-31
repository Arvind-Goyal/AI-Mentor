import {
  Activity,
  TrendingUp,
} from "lucide-react";


const WeeklyActivity = ({ data = [] }) => {

  const weeklyActivity = data;


  const maxCount = Math.max(
    ...weeklyActivity.map((item) => item.count),
    1
  );


  return (

    <div
      className="rounded-2xl border border-slate-200
                 bg-white p-6"
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className="flex h-10 w-10 items-center justify-center
                       rounded-xl bg-violet-50"
          >

            <Activity
              size={20}
              className="text-violet-600"
            />

          </div>


          <div>

            <h2 className="text-lg font-semibold text-slate-950">
              Weekly Activity
            </h2>

            <p className="text-sm text-slate-500">
              Your coding activity this week
            </p>

          </div>

        </div>


        <TrendingUp
          size={20}
          className="text-emerald-500"
        />

      </div>


      {/* Chart */}

      {weeklyActivity.length > 0 ? (

        <div className="mt-8">

          <div
            className="flex h-48 items-end
                       justify-between gap-3"
          >

            {weeklyActivity.map((item) => {

              const height =
                item.count > 0
                  ? Math.max(
                      (item.count / maxCount) * 100,
                      8
                    )
                  : 4;


              return (

                <div
                  key={item.day}
                  className="flex h-full flex-1
                             flex-col items-center
                             justify-end gap-3"
                >

                  {/* Bar */}

                  <div
                    className={`w-full max-w-12 rounded-t-lg
                      transition-all
                      ${
                        item.isCurrentWeek
                          ? "bg-violet-500"
                          : "bg-slate-200"
                      }`}
                    style={{
                      height: `${height}%`,
                    }}
                    title={`${item.count} ${
                      item.count === 1
                        ? "problem"
                        : "problems"
                    }`}
                  />

                  {/* Day */}

                  <span className="text-xs font-medium text-slate-500">
                    {item.day}
                  </span>

                </div>

              );

            })}

          </div>


          {/* Legend */}

          <div className="mt-6 flex items-center gap-5">

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />

              <span className="text-xs text-slate-500">
                This week
              </span>

            </div>


            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

              <span className="text-xs text-slate-500">
                Previous week
              </span>

            </div>

          </div>

        </div>

      ) : (

        <div className="flex h-48 items-center justify-center">

          <p className="text-sm text-slate-500">
            No activity data available yet.
          </p>

        </div>

      )}

    </div>

  );

};


export default WeeklyActivity;