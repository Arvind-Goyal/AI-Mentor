const FeatureCard = ({ icon, text }) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 min-w-[220px]">
    {icon}
    <span className="text-sm font-medium text-slate-700">
      {text}
    </span>
  </div>
);

export default FeatureCard
