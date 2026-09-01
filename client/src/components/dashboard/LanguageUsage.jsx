import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const LanguageUsage = ({ data = [] }) => {

  const languages = data;


  const COLORS = [
    "#7C3AED",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EC4899",
  ];


  const chartData = languages.map((language) => ({
    name: language.name,
    value: language.percentage,
  }));


  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* Header */}

      <h2 className="text-lg font-semibold text-slate-950">
        Language Usage
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Languages you've used for analyzed problems
      </p>


      {languages.length > 0 ? (

        <div className="mt-6 flex items-center gap-8">

          {/* Donut */}

          <div className="h-70 w-70 shrink-0">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={78}
                  outerRadius={98}
                  paddingAngle={3}
                  stroke="none"
                >

                  {chartData.map((_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />

                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>


          {/* Language list */}

          <div className="flex-1 space-y-4">

            {languages.map((language, index) => (

              <div
                key={language.name}
                className="flex items-center gap-4"
              >

                <div className="flex items-center gap-2">

                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="text-sm text-slate-700">
                    {language.name}
                  </span>

                </div>


                <span className="text-sm font-semibold text-slate-700">
                  {language.percentage}%
                </span>

              </div>

            ))}

          </div>

        </div>

      ) : (

        <div className="flex h-40 items-center justify-center">

          <p className="text-sm text-slate-500">
            No language usage data yet.
          </p>

        </div>

      )}

    </div>

  );

};


export default LanguageUsage;