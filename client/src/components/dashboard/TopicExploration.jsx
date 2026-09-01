import { useMemo } from "react";

const TopicExploration = ({
  data = [],
  showAll,
  setShowAll,
}) => {

  const maxCount = useMemo(() => {

    if (data.length === 0) {
      return 0;
    }

    return Math.max(
      ...data.map((topic) => topic.count)
    );

  }, [data]);


  const topics = showAll
    ? data
    : data.slice(0, 5);


  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-pink-500",
  ];


  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* Header */}

      <h2 className="text-lg font-semibold text-slate-950">
        Topic Exploration
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Topics you've explored through AI analysis
      </p>


      {/* Topics */}

      <div
        className={`mt-6 space-y-5 ${
          showAll
            ? "max-h-[470px] overflow-y-auto pr-2 scrollbar-hide"
            : ""
        }`}
      >

        {topics.length > 0 ? (

          topics.map((topic, index) => {

            const width =
              maxCount > 0
                ? (topic.count / maxCount) * 100
                : 0;


            return (

              <div key={topic.name}>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-700">
                    {topic.name}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    {topic.count}
                  </span>

                </div>


                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className={`h-full rounded-full ${
                      colors[index % colors.length]
                    }`}
                    style={{
                      width: `${width}%`,
                    }}
                  />

                </div>

              </div>

            );

          })

        ) : (

          <div className="py-8 text-center">

            <p className="text-sm text-slate-500">
              No topics explored yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Analyze a problem to start building your topic profile.
            </p>

          </div>

        )}

      </div>


      {/* View All / Show Less */}

      {data.length > 5 && (

        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-6 text-sm font-semibold text-violet-600
                     transition hover:text-violet-700"
        >

          {showAll
            ? "Show less ↑"
            : "View all topics →"}

        </button>

      )}

    </div>

  );

};


export default TopicExploration;