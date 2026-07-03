import { useAnalysis } from "../../context/AnalysisContext";

const AnalysisConfig = () => {
  const {language,setLanguage} = useAnalysis();
  return (
    <div className=" h-[350px] rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-start gap-4 p-4 border-b border-slate-200">    

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          2
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Analysis Configuration
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customize how AI should analyze your problem.
          </p>
        </div>

      </div>

      {/* Body */}
      <div className="p-4 space-y-1">

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Programming Language
          </label>

          <select
          value={language} // Assumes your state variable is called 'language'
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none">

            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>

          </select>

        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Analysis Mode
          </label>

          <select className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none">

            <option>Detailed</option>
            <option>Quick</option>
            <option>Interview</option>

          </select>

        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Difficulty
          </label>

          <select className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none">

            <option>Auto Detect</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>

          </select>

        </div>

      </div>

    </div>
  );
};

export default AnalysisConfig;