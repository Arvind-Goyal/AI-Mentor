import { weeklyActivity } from "../../constants/dashboardData";
const WeeklyActivity = () => {


  const maxValue = Math.max(
    ...weeklyActivity.map((item)=>item.count)
  );


  return (

    <div
      className="rounded-2xl border border-slate-200
                 bg-white p-6"
    >

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-lg font-semibold text-slate-950">
            Weekly Activity
          </h2>


          <p className="mt-1 text-sm text-slate-500">
            Problems analyzed this week
          </p>

        </div>


        <div
          className="rounded-lg bg-violet-50 px-3 py-1.5
                     text-sm font-semibold text-violet-600"
        >
          74 Problems
        </div>

      </div>




      {/* Chart */}

      <div className="mt-8 flex h-52 items-end justify-between gap-4">

        {
          weeklyActivity.map((item)=>(
            
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col
                         items-center justify-end gap-3"
            >


              {/* Bar */}

              <div
                className="w-full max-w-[42px]
                           rounded-t-xl bg-violet-500
                           transition-all hover:bg-violet-600"
                style={{
                  height:`${(item.count / maxValue) * 100}%`
                }}
              />


              {/* Count */}

              <span
                className="text-xs font-medium text-slate-400"
              >
                {item.day}
              </span>


            </div>

          ))
        }


      </div>



      {/* Footer */}

      <div
        className="mt-6 flex items-center justify-between
                   border-t border-slate-100 pt-4"
      >

        <p className="text-sm text-slate-500">
          Average daily activity
        </p>


        <p className="font-semibold text-slate-900">
          10.5 problems/day
        </p>


      </div>


    </div>

  );

};


export default WeeklyActivity;