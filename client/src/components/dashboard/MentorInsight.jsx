import { Sparkles, ArrowRight } from "lucide-react";
import { mentorInsight } from "../../constants/dashboardData";


const MentorInsight = () => {

  return (

    <div
      className="rounded-2xl border border-violet-100
                 bg-gradient-to-br from-violet-50 to-white
                 p-6"
    >

      {/* Header */}

      <div className="flex items-center gap-3">

        <div
          className="flex h-10 w-10 items-center justify-center
                     rounded-xl bg-violet-100"
        >
          <Sparkles
            size={20}
            className="text-violet-600"
          />
        </div>


        <div>

          <h2 className="text-lg font-semibold text-slate-950">
            AI Mentor Insight
          </h2>

          <p className="text-sm text-slate-500">
            Personalized learning suggestion
          </p>

        </div>

      </div>




      {/* Insight */}

      <div className="mt-6">

        <p className="text-sm leading-6 text-slate-700">

          You're doing great with{" "}

          {
            mentorInsight.strengths.map((item, index)=>(
              
              <span
                key={item}
                className="font-semibold text-violet-600"
              >
                {item}

                {
                  index !== mentorInsight.strengths.length - 1
                  && ", "
                }

              </span>

            ))
          }

          .

          <br />


          Consider practicing more{" "}

          <span className="font-semibold">
            {mentorInsight.suggestion}
          </span>

          {" "}

          {mentorInsight.message}


        </p>


      </div>




      {/* Action */}

      <button
        className="mt-6 flex items-center gap-2
                   text-sm font-semibold text-violet-600
                   hover:text-violet-700"
      >

        {mentorInsight.action}

        <ArrowRight size={16}/>

      </button>


    </div>

  );

};


export default MentorInsight;