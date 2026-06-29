const MentorHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">

      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">

        🧠

      </div>

      {/* Title */}
      <div>

        <h2 className="text-xl font-bold text-slate-900">
          AI Mentor
        </h2>

        <p className="text-sm text-slate-500">
          Your coding companion
        </p>

      </div>

    </div>
  );
};

export default MentorHeader;