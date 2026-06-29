const QuestionInput = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-slate-100">

        {/* Left */}
        <div className="flex items-start gap-4">

          {/* Step Number */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-semibold">
            1
          </div>

          {/* Title */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Paste Your Problem
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter a LeetCode URL or paste the complete problem statement.
            </p>
          </div>

        </div>

        {/* Import Button */}
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          Import Problem
        </button>

      </div>

      {/* Body */}
      <div className="p-6">

        <textarea
          rows={12}
          placeholder="Paste your problem statement here..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-200
            p-4
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-violet-500
            focus:ring-2
            focus:ring-violet-200
          "
        />

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 pb-6">

        <span className="text-sm text-slate-400">
          0 / 5000 characters
        </span>

        <span className="text-sm font-medium text-violet-600">
          ✓ Markdown Supported
        </span>

      </div>

    </div>
  );
};

export default QuestionInput;