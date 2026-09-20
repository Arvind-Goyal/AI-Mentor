import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const DashboardHero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const firstName = user?.name ? user.name.split(" ")[0] : "Coder";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 p-5 sm:p-7 text-white shadow-xl shadow-indigo-500/10">
      {/* Subtle decorative background circles */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-indigo-400/10 blur-xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Welcome Info */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {getGreeting()}, {firstName}! 👋
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-violet-100">
            Ready to prepare for top tech interviews? Lookup any LeetCode problem, get step-by-step guidance, and practice in our built-in code editor.
          </p>
        </div>

        {/* Right Analyze CTA */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => navigate("/analyze")}
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Sparkles size={18} className="text-violet-600" />
            <span>Analyze Problem</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
