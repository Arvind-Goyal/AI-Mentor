import { ArrowRight, BookOpen } from "lucide-react";


const ContinueLearning = ({ data }) => {

  const topic = data?.topic;

  const description =
    data?.description ||
    "Analyze more problems to get a personalized recommendation.";

  const action =
    data?.action ||
    "Analyze Problem";


  return (

    <div
      className="rounded-2xl border border-slate-200
                 bg-white p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3">

        <div
          className="flex h-10 w-10 items-center justify-center
                     rounded-xl bg-blue-50"
        >
          <BookOpen
            size={20}
            className="text-blue-600"
          />
        </div>


        <div>

          <h2 className="text-lg font-semibold text-slate-950">
            Continue Learning
          </h2>

          <p className="text-sm text-slate-500">
            Recommended next step
          </p>

        </div>

      </div>


      {/* Recommendation */}

      <div
        className="mt-6 rounded-xl border border-slate-100
                   bg-slate-50 p-4"
      >

        <p
          className="text-xs font-medium uppercase
                     tracking-wide text-slate-400"
        >
          Recommended Topic
        </p>


        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {topic || "Start Exploring"}
        </h3>


        <p className="mt-2 text-sm leading-5 text-slate-500">
          {description}
        </p>

      </div>


      {/* Action */}

      <button
        className="mt-5 flex items-center gap-2
                   text-sm font-semibold text-violet-600
                   hover:text-violet-700"
      >

        {action}

        <ArrowRight size={16} />

      </button>

    </div>

  );

};


export default ContinueLearning;