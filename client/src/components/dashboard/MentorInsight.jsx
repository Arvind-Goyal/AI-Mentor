import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MentorInsight = ({ data }) => {

  const navigate = useNavigate();

  const strengths = data?.strengths || [];

  const suggestion = data?.suggestion;

  const message =
    data?.message ||
    "Analyze more problems to receive personalized insights.";


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

        {strengths.length > 0 ? (

          <p className="text-sm leading-6 text-slate-700">

            You're doing great with{" "}

            {strengths.map((strength, index) => (

              <span
                key={strength}
                className="font-semibold text-violet-600"
              >

                {strength}

                {index < strengths.length - 1 && ", "}

              </span>

            ))}

            {suggestion && (
              <>

                .

                <br />

                Consider exploring{" "}

                <span className="font-semibold text-slate-900">
                  {suggestion}
                </span>{" "}

                {message}

              </>
            )}

            {!suggestion && "."}

          </p>

        ) : (

          <p className="text-sm leading-6 text-slate-600">

            Analyze more problems to build your
            personalized learning profile.

          </p>

        )}

      </div>


      {/* Action */}

      <button
        onClick={() => navigate("/analyze")}
        className="mt-6 flex items-center gap-2
                   text-sm font-semibold text-violet-600
                   hover:text-violet-700"
      >

        Continue Learning

        <ArrowRight size={16} />

      </button>

    </div>

  );

};


export default MentorInsight;