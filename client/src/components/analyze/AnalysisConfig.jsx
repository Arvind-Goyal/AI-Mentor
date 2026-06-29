const AnalysisConfig = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b border-slate-200">    

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
      <div className="p-6 space-y-5">

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Programming Language
          </label>

          <select className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none">

            <option>Java</option>
            <option>C++</option>
            <option>Python</option>
            <option>JavaScript</option>

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

          <select className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none">

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