const AnalyzeButton = () => {
  return (
    <button
      className="
        mt-6
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-indigo-600
        px-8
        py-6
        text-white
        shadow-lg
        transition
        duration-300
        hover:scale-[1.01]
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="text-left">

          <h2 className="text-xl font-semibold">
            ✨ Analyze Problem
          </h2>

          <p className="mt-1 text-sm text-violet-100">
            AI will analyze your problem and generate your personalized learning roadmap.
          </p>

        </div>

        {/* Right */}

        <div className="text-3xl">
          →
        </div>

      </div>
    </button>
  );
};

export default AnalyzeButton;