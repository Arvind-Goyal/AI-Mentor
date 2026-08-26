import { languageData } from "../../constants/dashboardData";

const LanguageUsage = () => {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="text-lg font-semibold text-slate-950">
        Language Usage
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Languages you use for problem solving
      </p>


      <div className="mt-8 flex items-center justify-center gap-10">


        <div
          className="relative h-36 w-36 rounded-full"
          style={{
            background:
            "conic-gradient(#7c3aed 0% 70%, #3b82f6 70% 90%, #4ade80 90%)"
          }}
        >

          <div
            className="absolute inset-6 flex items-center justify-center
                       rounded-full bg-white"
          >
            <span className="text-xl font-bold text-violet-600">
              {"</>"}
            </span>
          </div>

        </div>



        <div className="space-y-4">

          {
            languageData.map((lang)=>(
              <div
                key={lang.name}
                className="flex items-center gap-3"
              >

                <span
                  className={`h-3 w-3 rounded-full ${lang.color}`}
                />

                <span className="w-16 text-sm">
                  {lang.name}
                </span>

                <span className="font-semibold">
                  {lang.percentage}
                </span>

              </div>
            ))
          }

        </div>


      </div>

    </div>

  );
};


export default LanguageUsage;