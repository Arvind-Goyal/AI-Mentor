import { topicData } from "../../constants/dashboardData";


const TopicExploration = () => {

  const maxCount = Math.max(
    ...topicData.map((topic) => topic.count)
  );


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="text-lg font-semibold text-slate-950">
        Topic Exploration
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Topics you've explored through AI analysis
      </p>


      <div className="mt-6 space-y-5">

        {
          topicData.map((topic)=>(

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
                  className="h-full rounded-full bg-violet-500"
                  style={{
                    width:`${(topic.count / maxCount) * 100}%`
                  }}
                />

              </div>

            </div>

          ))
        }

      </div>


      <button
        className="mt-6 text-sm font-semibold text-violet-600"
      >
        View all topics →
      </button>

    </div>
  );
};


export default TopicExploration;