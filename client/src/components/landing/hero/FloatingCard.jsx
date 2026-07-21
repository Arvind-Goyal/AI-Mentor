const FloatingCard = ({ icon: Icon, title, value, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
        <Icon className="h-5 w-5 text-violet-600" />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500">
          {title}
        </p>

        <h4 className="text-lg font-semibold text-slate-900">
          {value}
        </h4>
      </div>
    </div>
  );
};

export default FloatingCard;